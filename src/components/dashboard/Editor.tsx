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
  Edit3,
  CheckCircle,
  Save,
  ArrowLeft,
  Clock,
  Sparkles,
  Trash2,
  Plus,
  Type,
  FileText,
  Upload,
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

  // Core Article Fields
  const [title, setTitle] = React.useState(initialPost?.title || "");
  const [content, setContent] = React.useState(initialPost?.content || "");
  const [slug, setSlug] = React.useState(
    initialPost?.slug || (initialPost?.title ? slugify(initialPost.title) : "")
  );
  const [excerpt, setExcerpt] = React.useState(initialPost?.excerpt || "");
  const [coverImage, setCoverImage] = React.useState(
    initialPost?.coverImage ||
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80"
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

  // View state: Natural Visual Document Writer vs Full Live Preview
  const [viewMode, setViewMode] = React.useState<"write" | "preview">("write");
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [allTags, setAllTags] = React.useState<Tag[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = React.useState(false);
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

  // Extract visual embedded images from content for clean UI management
  const embeddedImages = React.useMemo(() => {
    const regex = /!\[(.*?)\]\((.*?)\)/g;
    const matches: { alt: string; url: string; raw: string }[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push({ alt: match[1], url: match[2], raw: match[0] });
    }
    return matches;
  }, [content]);

  // Handle Title input
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (mode === "create") {
      setSlug(slugify(val));
    }
  };

  // Natural text formatting helper (No confusing markdown brackets needed by user)
  const applyFormatting = (prefix: string, suffix: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selectedText = previousText.substring(start, end) || placeholder;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newContent =
      previousText.substring(0, start) +
      replacement +
      previousText.substring(end);

    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 50);
  };

  // Clean image insertion: Inserts clean image into content with ZERO Base64 characters!
  const handleImageInsert = (markdownImage: string) => {
    // Extract image URL
    const match = markdownImage.match(/!\[.*?\]\((.*?)\)/);
    if (match && match[1]) {
      const extractedUrl = match[1];
      // Automatically set as article cover photo if cover is still the default stock photo
      if (
        !coverImage ||
        coverImage.includes("photo-1531482615713-2afd69097998") ||
        coverImage.includes("photo-1526374965328-7f61d4dc18c5")
      ) {
        setCoverImage(extractedUrl);
      }
    }

    const textarea = textareaRef.current;
    if (!textarea) {
      setContent((prev) => prev + "\n" + markdownImage + "\n");
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;

    const newContent =
      previousText.substring(0, start) +
      markdownImage +
      previousText.substring(end);

    setContent(newContent);
    toast({
      title: "Image Added to Story",
      description: "Photo embedded cleanly in your story and set as cover photo.",
      type: "success",
    });
  };

  // Explicit cover photo selection handler
  const handleCoverPhotoSelect = (markdownImage: string) => {
    const match = markdownImage.match(/!\[.*?\]\((.*?)\)/);
    if (match && match[1]) {
      setCoverImage(match[1]);
      toast({
        title: "Cover Photo Updated",
        description: "Your story card on the public website will display this exact image.",
        type: "success",
      });
    }
  };

  // Remove an embedded image card
  const handleRemoveImage = (rawImageMarkdown: string) => {
    setContent((prev) => prev.replace(rawImageMarkdown, "").replace(/\n\s*\n\s*\n/g, "\n\n"));
    toast({
      title: "Image Removed",
      description: "The image was removed from this story.",
      type: "info",
    });
  };

  // Save / Publish story
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
        excerpt: excerpt.trim() || content.replace(/!\[.*?\]\(.*?\)/g, "").slice(0, 140) + "...",
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
          title: "Story Updated!",
          description: `"${title}" has been saved as ${targetStatus}.`,
          type: "success",
        });
      } else {
        await createPost(payload);
        toast({
          title: targetStatus === "published" ? "Story Published!" : "Draft Saved!",
          description: `"${title}" is now live on the public website.`,
          type: "success",
        });
      }

      router.push("/dashboard/posts");
    } catch {
      toast({
        title: "Failed to save story",
        description: "Please check your connection and try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
      setIsPublishing(false);
    }
  };

  const currentCategory = categories.find((c) => c.id === categoryId);
  const readingTime = calculateReadingTime(content);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* 1. Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm sticky top-16 z-30 backdrop-blur-md bg-white/90 dark:bg-[#141a24]/90">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/posts"
            className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 dark:hover:text-white dark:hover:bg-stone-800 transition-colors"
            title="Back to stories"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-heading">
              {mode === "create" ? "Write New Story" : "Edit Story"}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono">
              <span>{wordCount} words</span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher: Natural Write vs Live Preview */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-2xl mr-2">
            <button
              type="button"
              onClick={() => setViewMode("write")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === "write"
                  ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
              }`}
            >
              <Edit3 className="h-3.5 w-3.5 text-amber-500" />
              <span>Write</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === "preview"
                  ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
              }`}
            >
              <Eye className="h-3.5 w-3.5 text-blue-500" />
              <span>Preview</span>
            </button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsSettingsOpen(true)}
            className="rounded-xl text-xs gap-1.5 h-9"
          >
            <Settings className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSaving || isPublishing}
            onClick={() => handleSave("draft")}
            className="rounded-xl text-xs gap-1.5 h-9"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Draft</span>
          </Button>

          <Button
            type="button"
            size="sm"
            disabled={isPublishing || isSaving}
            onClick={() => handleSave("published")}
            className="rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold hover:opacity-90 shadow-md text-xs gap-1.5 h-9 px-4"
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span>Publish</span>
          </Button>
        </div>
      </div>

      {/* 2. Visual Document Writing Area */}
      {viewMode === "write" && (
        <div className="space-y-6">
          {/* Document Canvas Container */}
          <div className="p-6 sm:p-12 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6 min-h-[600px]">
            {/* Visual Formatting Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800 sticky top-36 z-20 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 select-none">
                Format:
              </span>

              <button
                type="button"
                onClick={() => applyFormatting("## ", "\n", "Main Section Heading")}
                className="p-1.5 px-2.5 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-800 flex items-center gap-1 transition-colors"
                title="Heading 2"
              >
                <Heading2 className="h-3.5 w-3.5 text-amber-600" />
                <span>Heading</span>
              </button>

              <button
                type="button"
                onClick={() => applyFormatting("### ", "\n", "Sub-heading")}
                className="p-1.5 px-2 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-800 flex items-center gap-1 transition-colors"
                title="Heading 3"
              >
                <Heading3 className="h-3.5 w-3.5 text-amber-600" />
                <span>Sub-heading</span>
              </button>

              <div className="h-4 w-px bg-stone-200 dark:bg-stone-700 mx-1" />

              <button
                type="button"
                onClick={() => applyFormatting("**", "**", "bold text")}
                className="p-1.5 rounded-xl text-stone-700 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-800 transition-colors"
                title="Bold"
              >
                <Bold className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => applyFormatting("*", "*", "italic text")}
                className="p-1.5 rounded-xl text-stone-700 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-800 transition-colors"
                title="Italic"
              >
                <Italic className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => applyFormatting("\n> ", "\n", "Enter quotation or key highlight...")}
                className="p-1.5 px-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-800 flex items-center gap-1 transition-colors"
                title="Quote callout"
              >
                <Quote className="h-3.5 w-3.5 text-amber-600" />
                <span>Quote</span>
              </button>

              <button
                type="button"
                onClick={() => applyFormatting("\n* ", "\n", "List point")}
                className="p-1.5 rounded-xl text-stone-700 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-800 transition-colors"
                title="Bulleted list"
              >
                <List className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => applyFormatting("\n1. ", "\n", "Step point")}
                className="p-1.5 rounded-xl text-stone-700 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-800 transition-colors"
                title="Numbered list"
              >
                <ListOrdered className="h-3.5 w-3.5" />
              </button>

              <div className="h-4 w-px bg-stone-200 dark:bg-stone-700 mx-1" />

              {/* Photo Inserter (Real visual image button) */}
              <button
                type="button"
                onClick={() => setIsImageModalOpen(true)}
                className="p-1.5 px-3 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors border border-amber-500/20"
                title="Upload and insert a photo into your story"
              >
                <ImageIcon className="h-3.5 w-3.5" />
                <span>Add Photo</span>
              </button>
            </div>

            {/* Featured Story Cover Photo Card */}
            <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <ImageIcon className="h-3.5 w-3.5 text-amber-600" />
                  <span>Story Cover Photo (Displays on Homepage &amp; Cards)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsCoverModalOpen(true)}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Upload className="h-3 w-3" />
                  <span>Upload / Change Photo</span>
                </button>
              </div>

              {coverImage && (
                <div className="relative h-40 sm:h-52 w-full rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800">
                  <Image
                    src={coverImage}
                    alt="Article cover photo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white font-mono">
                    Cover Photo Active
                  </div>
                </div>
              )}
            </div>

            {/* Title Canvas */}
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Title of your story..."
              className="w-full bg-transparent text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 placeholder:text-stone-300 dark:placeholder:text-stone-700 font-heading focus:outline-none border-b border-stone-100 dark:border-stone-800 pb-4 leading-tight"
            />

            {/* Embedded Images Showcase Bar (Real Visual Photos, ZERO characters) */}
            {embeddedImages.length > 0 && (
              <div className="space-y-2 pt-2 pb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <ImageIcon className="h-3.5 w-3.5 text-amber-500" />
                  <span>Embedded Story Photos ({embeddedImages.length})</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {embeddedImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 group shadow-sm"
                    >
                      <div className="relative aspect-video w-full">
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2.5 bg-white dark:bg-stone-900 flex items-center justify-between gap-2 border-t border-stone-100 dark:border-stone-800">
                        <span className="text-[11px] font-medium text-stone-700 dark:text-stone-300 truncate">
                          {img.alt || "Story Photo"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setCoverImage(img.url);
                              toast({ title: "Cover Photo Set", type: "success" });
                            }}
                            className="p-1 text-[10px] font-bold text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded px-1.5"
                            title="Set this as main cover photo"
                          >
                            Set Cover
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(img.raw)}
                            className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Remove photo"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Natural Document Writing Canvas */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 select-none flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>Story Body</span>
              </label>
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing your story naturally here... Use the toolbar above to add headings, quotes, lists, or photos anytime."
                rows={18}
                className="w-full bg-transparent text-base sm:text-lg text-stone-800 dark:text-stone-200 placeholder:text-stone-400/80 leading-relaxed focus:outline-none resize-y min-h-[380px] font-sans"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Live Preview Mode */}
      {viewMode === "preview" && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-8 max-w-4xl mx-auto">
          {/* Cover Photo */}
          {coverImage && (
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-md bg-stone-100 dark:bg-stone-800">
              <Image
                src={coverImage}
                alt={title || "Cover photo"}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="space-y-4 border-b border-stone-100 dark:border-stone-800 pb-6">
            <div className="flex items-center gap-2">
              {currentCategory && (
                <span className="editorial-tag text-xs font-bold px-3 py-0.5 rounded-full">
                  {currentCategory.name}
                </span>
              )}
              <span className="text-xs text-stone-400 font-mono">
                {readingTime} min read
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white font-heading leading-tight">
              {title || "Untitled Story"}
            </h1>
            {excerpt && (
              <p className="text-base text-stone-600 dark:text-stone-300 italic">
                {excerpt}
              </p>
            )}
          </div>

          {/* Rendered Story Body */}
          <div className="space-y-6">
            <ArticleContent content={content || "*Your story content will appear here...*"} />
          </div>
        </div>
      )}

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

      {/* Body Image Insert Modal */}
      <InsertImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onInsert={handleImageInsert}
      />

      {/* Cover Photo Modal */}
      <InsertImageModal
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
        onInsert={handleCoverPhotoSelect}
      />
    </div>
  );
}
