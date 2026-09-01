"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  Clock,
  Sparkles,
  Layers,
} from "lucide-react";
import { Post, Category, Tag, PostStatus } from "@/lib/types";
import { createPost, updatePost } from "@/lib/api/posts";
import { getCategories, getTags } from "@/lib/api/categories";
import { calculateReadingTime, slugify } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArticleContent } from "@/components/public/ArticleContent";
import { PostSettingsModal } from "./PostSettingsModal";
import { InsertImageModal } from "./InsertImageModal";
import { useToast } from "@/components/ui/Toast";

interface EditorProps {
  initialPost?: Post;
  mode?: "create" | "edit";
}

export function Editor({ initialPost, mode = "create" }: EditorProps) {
  const router = useRouter();
  const { toast } = useToast();

  // Core Form State (EMPTY BY DEFAULT FOR NEW ARTICLES)
  const [title, setTitle] = React.useState(initialPost?.title || "");
  const [content, setContent] = React.useState(initialPost?.content || "");
  const [slug, setSlug] = React.useState(
    initialPost?.slug || (initialPost?.title ? slugify(initialPost.title) : "")
  );
  const [excerpt, setExcerpt] = React.useState(initialPost?.excerpt || "");
  const [coverImage, setCoverImage] = React.useState(
    initialPost?.coverImage ||
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80"
  );
  const [status, setStatus] = React.useState<PostStatus>(
    initialPost?.status || "published"
  );
  const [categoryId, setCategoryId] = React.useState(
    initialPost?.category?.id || "cat-tech"
  );
  const [selectedTagIds, setSelectedTagIds] = React.useState<string[]>(
    initialPost?.tags?.map((t) => t.id) || ["tag-1"]
  );
  const [metaTitle, setMetaTitle] = React.useState(
    initialPost?.seo?.metaTitle || ""
  );
  const [metaDescription, setMetaDescription] = React.useState(
    initialPost?.seo?.metaDescription || ""
  );

  // View & UI State (Default to single Write view on mobile)
  const [viewMode, setViewMode] = React.useState<"write" | "split" | "preview">("write");
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [allTags, setAllTags] = React.useState<Tag[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isPublishing, setIsPublishing] = React.useState(false);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    Promise.all([getCategories(), getTags()]).then(([cats, tags]) => {
      setCategories(cats);
      setAllTags(tags);
      if (!initialPost && cats.length > 0) {
        setCategoryId(cats[0].id);
      }
    });
  }, [initialPost]);

  // Sync title to slug automatically on create mode if slug wasn't manually customized
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (mode === "create") {
      setSlug(slugify(val));
    }
  };

  // Helper to insert Markdown text at current cursor position
  const insertMarkdown = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selectedText = previousText.substring(start, end) || placeholder;

    const replacement = `${before}${selectedText}${after}`;
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
    }, 50);
  };

  const handleSave = async (targetStatus: PostStatus) => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please provide an article title before saving.",
        type: "error",
      });
      return;
    }

    if (targetStatus === "published") {
      setIsPublishing(true);
    } else {
      setIsSaving(true);
    }

    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim() || slugify(title),
        content,
        excerpt: excerpt.trim() || content.slice(0, 140) + "...",
        coverImage,
        categoryId,
        tagIds: selectedTagIds,
        authorId: initialPost?.author?.id || "auth-khophi",
        status: targetStatus,
        language: "en" as const,
        seo: {
          metaTitle: metaTitle.trim() || title.trim(),
          metaDescription: metaDescription.trim() || excerpt.trim(),
        },
      };

      if (mode === "edit" && initialPost) {
        await updatePost(initialPost.id, payload);
        toast({
          title: "Article Updated!",
          description: `"${title}" has been saved as ${targetStatus}.`,
          type: "success",
        });
      } else {
        await createPost(payload);
        toast({
          title: targetStatus === "published" ? "Article Published!" : "Draft Saved!",
          description: `"${title}" is now ${targetStatus}.`,
          type: "success",
        });
      }

      router.push("/dashboard/posts");
      router.refresh();
    } catch {
      toast({
        title: "Save Failed",
        description: "An error occurred while saving the article.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
      setIsPublishing(false);
    }
  };

  const currentCategory = categories.find((c) => c.id === categoryId);
  const readingTime = calculateReadingTime(content);

  return (
    <div className="space-y-4">
      {/* 1. Header Toolbar (Responsive Mobile & Desktop) */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        {/* Top Row: Back link, status, and save/publish buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/dashboard/posts"
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Back to articles"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                {mode === "create" ? "New Article" : "Editing Article"}
              </p>
              <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 truncate max-w-[180px] sm:max-w-xs">
                {title || "Untitled Post"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSettingsOpen(true)}
              className="h-8 sm:h-9 text-xs gap-1.5 rounded-xl border-stone-300 dark:border-stone-700"
              title="Post Settings"
            >
              <Settings className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Settings</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              isLoading={isSaving}
              onClick={() => handleSave("draft")}
              className="h-8 sm:h-9 text-xs gap-1.5 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200"
            >
              <Save className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Save Draft</span>
            </Button>

            <Button
              size="sm"
              isLoading={isPublishing}
              onClick={() => handleSave("published")}
              className="h-8 sm:h-9 text-xs gap-1.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold hover:opacity-90 shadow-sm"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Publish</span>
            </Button>
          </div>
        </div>

        {/* Second Row: View Tabs & Markdown Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-stone-100 dark:border-stone-800">
          {/* View Modes */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl w-fit">
            <button
              onClick={() => setViewMode("write")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === "write"
                  ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Write</span>
            </button>

            <button
              onClick={() => setViewMode("split")}
              className={`hidden md:flex px-3 py-1 rounded-lg text-xs font-semibold items-center gap-1.5 transition-colors ${
                viewMode === "split"
                  ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
              }`}
            >
              <Columns2 className="h-3.5 w-3.5" />
              <span>Split</span>
            </button>

            <button
              onClick={() => setViewMode("preview")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === "preview"
                  ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Preview</span>
            </button>
          </div>

          {/* Markdown Quick Formatting Toolbar (Touch Scrollable on Mobile) */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            <button
              type="button"
              onClick={() => insertMarkdown("## ", "\n", "Heading 2")}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 text-xs font-bold shrink-0 hover:text-amber-600"
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("### ", "\n", "Heading 3")}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 text-xs font-bold shrink-0 hover:text-amber-600"
              title="Heading 3"
            >
              <Heading3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("**", "**", "bold text")}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 shrink-0 hover:text-amber-600"
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("*", "*", "italic text")}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 shrink-0 hover:text-amber-600"
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("\n```typescript\n", "\n```\n", "// code here")}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 shrink-0 hover:text-amber-600"
              title="Code block"
            >
              <Code className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("\n> ", "\n", "quote text")}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 shrink-0 hover:text-amber-600"
              title="Blockquote"
            >
              <Quote className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("\n* ", "\n", "List item")}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 shrink-0 hover:text-amber-600"
              title="Bulleted list"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("\n1. ", "\n", "List item")}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 shrink-0 hover:text-amber-600"
              title="Numbered list"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown("[", "](https://example.com)", "link text")}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 shrink-0 hover:text-amber-600"
              title="Link"
            >
              <LinkIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsImageModalOpen(true)}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 shrink-0 hover:text-amber-600"
              title="Insert Image (Upload or URL)"
            >
              <ImageIcon className="h-4 w-4" />
            </button>

            <span className="text-[11px] text-stone-400 font-mono ml-2 whitespace-nowrap">
              {readingTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Editing Surface */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Write Pane */}
        {(viewMode === "write" || viewMode === "split") && (
          <div
            className={`space-y-4 ${
              viewMode === "split" ? "md:col-span-6" : "md:col-span-12"
            }`}
          >
            <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              {/* Title Input */}
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Article Title..."
                className="w-full bg-transparent text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 dark:text-stone-100 placeholder:text-stone-300 dark:placeholder:text-stone-600 font-heading focus:outline-none border-b border-stone-100 dark:border-stone-800 pb-3"
              />

              {/* Markdown Body Textarea */}
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your story in markdown... (supports headings ##, code blocks, lists, quotes, and images)"
                rows={18}
                className="w-full bg-transparent text-sm sm:text-base text-stone-800 dark:text-stone-200 placeholder:text-stone-400 font-mono leading-relaxed focus:outline-none resize-y min-h-[360px]"
              />
            </div>
          </div>
        )}

        {/* Live Preview Pane */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div
            className={`space-y-4 ${
              viewMode === "split" ? "md:col-span-6" : "md:col-span-12"
            }`}
          >
            <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
              {/* Cover Photo */}
              {coverImage && (
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm bg-stone-100 dark:bg-stone-800">
                  <Image
                    src={coverImage}
                    alt={title || "Cover photo"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Title & Metadata Header */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {currentCategory && (
                    <span className="editorial-tag font-bold px-2.5 py-0.5 rounded-full">
                      {currentCategory.name}
                    </span>
                  )}
                  <span className="text-stone-500 font-medium">
                    {readingTime} min read
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 font-heading leading-tight">
                  {title || "Untitled Article"}
                </h1>

                {excerpt && (
                  <p className="text-sm text-stone-600 dark:text-stone-300 italic leading-relaxed">
                    {excerpt}
                  </p>
                )}
              </div>

              {/* Rendered Content */}
              <div className="border-t border-stone-100 dark:border-stone-800 pt-6">
                {content ? (
                  <ArticleContent content={content} />
                ) : (
                  <p className="text-xs text-stone-400 italic">
                    Start typing on the Write tab to see the live formatted preview here.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Settings Modal */}
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

      {/* Insert Image Modal */}
      <InsertImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onInsert={(mdImage) => {
          insertMarkdown("", "", mdImage);
        }}
      />
    </div>
  );
}
