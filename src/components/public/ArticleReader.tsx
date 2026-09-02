"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, Eye, Calendar, ArrowLeft, Twitter, Github, Edit, Trash2, Loader2 } from "lucide-react";
import { Post, Comment } from "@/lib/types";
import { getPostBySlug, getPosts, deletePost, incrementPostView } from "@/lib/api/posts";
import { getCommentsByPostId } from "@/lib/api/comments";
import { ArticleContent } from "@/components/public/ArticleContent";
import { TableOfContents, extractHeadings } from "@/components/public/TableOfContents";
import { InteractionBar } from "@/components/public/InteractionBar";
import { CommentsSection } from "@/components/public/CommentsSection";
import { PostCard } from "@/components/public/PostCard";
import { ReadingProgressBar } from "@/components/public/ReadingProgressBar";
import { formatDate, formatCompactNumber } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { DeleteConfirmModal } from "@/components/ui/DeleteConfirmModal";
import { useToast } from "@/components/ui/Toast";

export function ArticleReader({
  slug,
  initialPost,
}: {
  slug: string;
  initialPost?: Post | null;
}) {
  const [post, setPost] = React.useState<Post | null>(initialPost || null);
  const [views, setViews] = React.useState<number>(initialPost?.views || 1);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [relatedPosts, setRelatedPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(!initialPost);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    const resolveArticle = async () => {
      try {
        const currentPost = await getPostBySlug(slug);
        if (currentPost) {
          setPost(currentPost);
          setViews(currentPost.views || 1);
          incrementPostView(currentPost.id).then((newViews) => {
            if (newViews > 0) setViews(newViews);
          });

          const [cmts, related] = await Promise.all([
            getCommentsByPostId(currentPost.id),
            getPosts({ categorySlug: currentPost.category.slug, limit: 3 }),
          ]);
          setComments(cmts);
          setRelatedPosts(related.filter((p) => p.id !== currentPost?.id).slice(0, 2));
        }
      } catch {}
      setLoading(false);
    };

    resolveArticle();
  }, [slug]);

  const handleDeleteConfirm = async () => {
    if (!post) return;
    setIsDeleting(true);
    try {
      await deletePost(post.id);
      toast({
        title: "Article Deleted",
        description: `"${post.title}" has been permanently removed.`,
        type: "info",
      });
      setIsDeleteModalOpen(false);
      router.push("/dashboard/posts");
    } catch {
      toast({
        title: "Delete Failed",
        description: "Could not delete article. Please try again.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500 mx-auto" />
        <p className="text-xs text-stone-500 font-mono">Loading story...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center space-y-4">
        <div className="p-8 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 font-heading">
            Story Not Found
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            The article &ldquo;{slug}&rdquo; is not available or may have been deleted.
          </p>
          <Link href="/">
            <Button size="sm" className="gap-2 rounded-xl text-xs bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Public Feed</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const headings = extractHeadings(post.content);

  return (
    <>
      <ReadingProgressBar />
      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Action & Category Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Stories</span>
          </Link>

          {/* Author / Editorial Control Buttons */}
          <div className="flex items-center gap-2">
            {post.status === "draft" && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300">
                Draft Preview
              </span>
            )}
            
            <Link href={`/categories?slug=${post.category.slug}`}>
              <span className="editorial-tag text-xs font-bold px-3 py-1 rounded-full">
                {post.category.name}
              </span>
            </Link>

          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-6 mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 dark:text-white leading-[1.15] font-heading">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed italic">
              {post.excerpt}
            </p>
          )}

          {/* Author Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
            <Link
              href={`/about`}
              className="flex items-center gap-3.5 group/author"
            >
              <Image
                src={post.author.avatar || "/khophi_profile.jpg"}
                alt={post.author.name}
                width={44}
                height={44}
                className="rounded-full object-cover ring-2 ring-amber-500/40 h-11 w-11"
              />
              <div>
                <p className="text-sm font-bold text-stone-900 dark:text-white group-hover/author:text-amber-600 transition-colors">
                  {post.author.name}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {post.author.role} • {post.author.location || "Accra, Ghana"}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTimeMinutes} min read
              </span>
              <span className="flex items-center gap-1" title="Live real-time reader counter">
                <Eye className="h-3.5 w-3.5 text-amber-600" />
                {formatCompactNumber(views)} reads
              </span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-3xl mb-12 shadow-xl border border-stone-200 dark:border-stone-800 bg-stone-900">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = "0.5";
              }}
            />
          </div>
        )}

        {/* Two-Column Reader Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Article Body */}
            <ArticleContent content={post.content} coverImage={post.coverImage} />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-stone-400">Topics:</span>
                {post.tags.map((tag) => (
                  <Link key={tag.id} href={`/categories?tag=${tag.slug}`}>
                    <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-amber-100 transition-colors">
                      #{tag.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Interactive Reactions & Share Bar */}
            <InteractionBar
              postId={post.id}
              title={post.title}
              initialLikes={post.likes}
              initialBookmarks={post.bookmarksCount}
              commentsCount={comments.length}
            />

            {/* Author Bio & Action Box */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm">
              <Image
                src={post.author.avatar || "/khophi_profile.jpg"}
                alt={post.author.name}
                width={64}
                height={64}
                className="rounded-2xl object-cover ring-2 ring-amber-500 shadow-md h-16 w-16 shrink-0"
              />
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-stone-900 dark:text-white font-heading">
                    Written by {post.author.name}
                  </h4>
                  <div className="flex items-center gap-2 text-stone-400">
                    {post.author.twitter && (
                      <a href={post.author.twitter} target="_blank" rel="noreferrer" className="hover:text-amber-600 transition-colors">
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {post.author.bio}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                  <a
                    href="https://wa.me/233240000000"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#128C7E] dark:text-[#25D366] hover:underline inline-flex items-center gap-1"
                  >
                    Send Khophi a thought on WhatsApp →
                  </a>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 ml-auto"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete Story</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <CommentsSection postId={post.id} initialComments={comments} />
          </div>

          {/* Sidebar Sticky ToC Column */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {headings.length > 0 && <TableOfContents headings={headings} />}

              {/* Author Quick Card */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-[#141a24] space-y-3 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Lead Author
                </h4>
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.avatar || "/khophi_profile.jpg"}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover ring-1 ring-amber-500 h-10 w-10"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-white">
                      {post.author.name}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                      @{post.author.handle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Stories Grid */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-stone-200 dark:border-stone-800 space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white font-heading">
              More from the Publication
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <PostCard key={related.id} post={related} variant="horizontal" />
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Published Story"
        itemTitle={post.title}
        isDeleting={isDeleting}
      />
    </>
  );
}
