"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  Code,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Settings,
  Eye,
  Columns2,
  Edit3,
  CheckCircle,
  Save,
  ArrowLeft,
} from "lucide-react";
import { Post, Category, Tag, PostStatus } from "@/lib/types";
import { createPost, updatePost } from "@/lib/api/posts";
import { getCategories, getTags } from "@/lib/api/categories";
import { calculateReadingTime, slugify } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArticleContent } from "@/components/public/ArticleContent";
import { PostSettingsModal } from "./PostSettingsModal";
import { useToast } from "@/components/ui/Toast";

interface EditorProps {
  initialPost?: Post;
  mode?: "create" | "edit";
}

export function Editor({ initialPost, mode = "create" }: EditorProps) {
  const router = useRouter();
  const { toast } = useToast();

  // Core Form State
  const [title, setTitle] = React.useState(initialPost?.title || "");
  const [content, setContent] = React.useState(
    initialPost?.content ||
      `### Architecture Overview\n\nExplain the system design, latency trade-offs, and data pipelines here.\n\n\`\`\`typescript\n// Example implementation\nexport async function executeDistributedTask(payload: TaskPayload) {\n  const startTime = performance.now();\n  const result = await workerPool.dispatch(payload);\n  return { result, durationMs: performance.now() - startTime };\n}\n\`\`\`\n\n### Key Takeaways\n\n* **Low-Latency Edge Execution**: Keep computation close to the reader.\n* **Optimistic Updates**: Provide instantaneous user feedback before roundtrips resolve.\n\n> "Good software architecture simplifies change and decouples blast radius."\n`
  );
  const [slug, setSlug] = React.useState(
    initialPost?.slug || (initialPost?.title ? slugify(initialPost.title) : "")
  );
  const [excerpt, setExcerpt] = React.useState(initialPost?.excerpt || "");
  const [coverImage, setCoverImage] = React.useState(
    initialPost?.coverImage ||
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"
  );
  const [status, setStatus] = React.useState<PostStatus>(
    initialPost?.status || "published"
  );
  const [categoryId, setCategoryId] = React.useState<string>(
    initialPost?.category?.id || "cat-1"
  );
  const [selectedTagIds, setSelectedTagIds] = React.useState<string[]>(
    initialPost?.tags?.map((t) => t.id) || ["tag-1", "tag-2"]
  );
  const [metaTitle, setMetaTitle] = React.useState(
    initialPost?.seo?.metaTitle || ""
  );
  const [metaDescription, setMetaDescription] = React.useState(
    initialPost?.seo?.metaDescription || ""
  );

  // UI State
  const [viewMode, setViewMode] = React.useState<"write" | "split" | "preview">(
    "split"
  );
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [allTags, setAllTags] = React.useState<Tag[]>([]);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    getCategories().then(setCategories);
    getTags().then(setAllTags);
  }, []);

  // Word count & reading time
  const readingTime = calculateReadingTime(content);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const insertSnippet = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selectedText = previousText.substring(start, end);

    const replacement = before + selectedText + after;
    const newContent =
      previousText.substring(0, start) +
      replacement +
      previousText.substring(end);

    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 10);
  };

  const handleSave = async (targetStatus: PostStatus = status) => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide an article title before saving.",
        type: "error",
      });
      return;
    }

    setIsSaving(true);
    try {
      if (mode === "create") {
        const created = await createPost({
          title,
          slug: slug || slugify(title),
          excerpt: excerpt || content.slice(0, 140) + "...",
          content,
          coverImage,
          categoryId,
          tagIds: selectedTagIds,
          status: targetStatus,
          authorId: "auth-1",
          seo: {
            metaTitle: metaTitle || title,
            metaDescription: metaDescription || excerpt,
          },
        });

        toast({
          title: targetStatus === "published" ? "Article Published!" : "Draft Saved!",
          description: `"${title}" has been saved to your catalog.`,
          type: "success",
        });

        router.push(targetStatus === "published" ? `/blog/${created.slug}` : `/dashboard/posts`);
      } else if (initialPost) {
        const updated = await updatePost(initialPost.id, {
          title,
          slug: slug || slugify(title),
          excerpt,
          content,
          coverImage,
          status: targetStatus,
          seo: {
            metaTitle,
            metaDescription,
          },
        });

        toast({
          title: "Article Updated!",
          description: "All changes have been successfully saved.",
          type: "success",
        });

        router.push(`/dashboard/posts`);
      }
    } catch (err) {
      toast({
        title: "Failed to save article",
        description: "An unexpected error occurred.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Top Action Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/posts")}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="hidden sm:block">
            <p className="text-xs text-slate-400">
              {mode === "create" ? "Creating Draft" : "Editing Article"}
            </p>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
              {title || "Untitled Article"}
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode("write")}
            className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
              viewMode === "write"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" /> Write
          </button>
          <button
            onClick={() => setViewMode("split")}
            className={`hidden md:flex px-2.5 py-1 rounded text-xs font-medium items-center gap-1 transition-colors ${
              viewMode === "split"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            <Columns2 className="h-3.5 w-3.5" /> Split
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
              viewMode === "preview"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSettingsOpen(true)}
            className="gap-1.5 border-slate-300 dark:border-slate-700"
          >
            <Settings className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            isLoading={isSaving}
            onClick={() => handleSave("draft")}
            className="gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Save Draft</span>
          </Button>

          <Button
            size="sm"
            isLoading={isSaving}
            onClick={() => handleSave("published")}
            className="shadow-sm"
          >
            Publish Article
          </Button>
        </div>
      </header>

      {/* Editor Markdown Toolbar */}
      {viewMode !== "preview" && (
        <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 flex items-center gap-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => insertSnippet("## ", "")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("### ", "")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </button>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
          <button
            type="button"
            onClick={() => insertSnippet("**", "**")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("*", "*")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 italic"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("```typescript\n", "\n```")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Code Block"
          >
            <Code className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("> ", "")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("- ", "")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Bullet list"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("1. ", "")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Numbered list"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
          <button
            type="button"
            onClick={() => insertSnippet("[Link Text](", ")")}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              insertSnippet(
                "![Architecture Diagram](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200)",
                ""
              )
            }
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Insert Image"
          >
            <ImageIcon className="h-4 w-4" />
          </button>

          <div className="ml-auto flex items-center gap-3 text-[11px] text-slate-500 font-medium">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      )}

      {/* Main Writing Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Write Pane */}
        {(viewMode === "write" || viewMode === "split") && (
          <div
            className={`flex-1 flex flex-col p-6 sm:p-10 overflow-y-auto bg-white dark:bg-slate-900 ${
              viewMode === "split" ? "border-r border-slate-200 dark:border-slate-800" : ""
            }`}
          >
            <input
              type="text"
              placeholder="Article Title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slug || slug === slugify(title)) {
                  setSlug(slugify(e.target.value));
                }
              }}
              className="w-full text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 placeholder:text-slate-300 focus:outline-none dark:text-white dark:placeholder:text-slate-600 bg-transparent mb-6"
            />

            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article in Markdown..."
              className="flex-1 w-full bg-transparent font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none resize-none min-h-[500px]"
            />
          </div>
        )}

        {/* Live Preview Pane */}
        {(viewMode === "split" || viewMode === "preview") && (
          <div
            className={`flex-1 p-6 sm:p-10 overflow-y-auto ${
              viewMode === "preview" ? "max-w-4xl mx-auto w-full" : ""
            }`}
          >
            {coverImage && (
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 shadow-md">
                <Image
                  src={coverImage}
                  alt={title || "Cover Image"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-4 mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {title || "Untitled Article"}
              </h1>
              {excerpt && (
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  {excerpt}
                </p>
              )}
            </div>

            <ArticleContent content={content} />
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <PostSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title={title}
        slug={slug}
        setSlug={setSlug}
        excerpt={excerpt}
        setExcerpt={setExcerpt}
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
        selectedTagIds={selectedTagIds}
        setSelectedTagIds={setSelectedTagIds}
        allTags={allTags}
        metaTitle={metaTitle}
        setMetaTitle={setMetaTitle}
        metaDescription={metaDescription}
        setMetaDescription={setMetaDescription}
      />
    </div>
  );
}
