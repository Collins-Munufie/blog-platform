"use client";

import * as React from "react";
import Link from "next/link";
import { Edit, Trash2, ExternalLink, Eye, Heart, ArrowRight } from "lucide-react";
import { Post } from "@/lib/types";
import { deletePost } from "@/lib/api/posts";
import { Button } from "@/components/ui/Button";
import { formatDate, formatCompactNumber } from "@/lib/utils";
import { DeleteConfirmModal } from "@/components/ui/DeleteConfirmModal";
import { useToast } from "@/components/ui/Toast";

export function RecentStoriesCard({
  initialDrafts,
  initialPublished,
}: {
  initialDrafts: Post[];
  initialPublished: Post[];
}) {
  const [drafts, setDrafts] = React.useState<Post[]>(initialDrafts);
  const [published, setPublished] = React.useState<Post[]>(initialPublished);
  const [postToDelete, setPostToDelete] = React.useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const { toast } = useToast();

  React.useEffect(() => {
    const syncLatest = async () => {
      try {
        const { getPosts } = await import("@/lib/api/posts");
        const all = await getPosts({ status: "all" });
        if (all && all.length > 0) {
          setDrafts(all.filter((p) => p.status === "draft").slice(0, 3));
          setPublished(all.filter((p) => p.status === "published").slice(0, 3));
        }
      } catch {}
    };

    syncLatest();

    window.addEventListener("posts_updated", syncLatest);
    window.addEventListener("storage", syncLatest);
    window.addEventListener("focus", syncLatest);

    const poll = setInterval(syncLatest, 3000);

    return () => {
      window.removeEventListener("posts_updated", syncLatest);
      window.removeEventListener("storage", syncLatest);
      window.removeEventListener("focus", syncLatest);
      clearInterval(poll);
    };
  }, []);

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      await deletePost(postToDelete.id);
      setDrafts((prev) => prev.filter((p) => p.id !== postToDelete.id));
      setPublished((prev) => prev.filter((p) => p.id !== postToDelete.id));
      toast({
        title: "Article Deleted",
        description: `"${postToDelete.title}" was removed.`,
        type: "info",
      });
      setPostToDelete(null);
    } catch {
      toast({
        title: "Failed to delete",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Working Drafts */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
                Drafts in Progress
              </h3>
              <p className="text-xs text-stone-500">
                {drafts.length} unpublished draft{drafts.length === 1 ? "" : "s"}
              </p>
            </div>
            <Link
              href="/dashboard/posts/new"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              + New draft
            </Link>
          </div>

          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {drafts.length === 0 ? (
              <p className="py-6 text-xs text-stone-400 text-center">No drafts in progress.</p>
            ) : (
              drafts.map((draft) => (
                <div key={draft.id} className="py-3 flex items-center justify-between gap-3 group">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      {draft.title}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      {draft.category.name} • {draft.readingTimeMinutes} min read
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Link href={`/dashboard/posts/${draft.id}/edit`}>
                      <Button variant="outline" size="sm" className="h-8 text-xs gap-1 rounded-xl">
                        <Edit className="h-3.5 w-3.5 text-blue-500" />
                        <span>Edit</span>
                      </Button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPostToDelete(draft)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete draft"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recently Published */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
                Recent Published Stories
              </h3>
              <p className="text-xs text-stone-500">
                {published.length} live stories
              </p>
            </div>
            <Link
              href="/dashboard/posts"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {published.length === 0 ? (
              <p className="py-6 text-xs text-stone-400 text-center">No published stories yet.</p>
            ) : (
              published.map((post) => (
                <div key={post.id} className="py-3 flex items-center justify-between gap-3 group">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      {post.title}
                    </p>
                    <p className="text-[11px] text-stone-500 flex items-center gap-2">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Eye className="h-3 w-3 text-amber-500" /> {formatCompactNumber(post.views)}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Heart className="h-3 w-3 text-rose-500" /> {formatCompactNumber(post.likes)}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xl" title="View story">
                        <ExternalLink className="h-3.5 w-3.5 text-stone-500" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/posts/${post.id}/edit`}>
                      <Button variant="outline" size="sm" className="h-8 text-xs rounded-xl" title="Edit story">
                        <Edit className="h-3.5 w-3.5 text-blue-500" />
                      </Button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPostToDelete(post)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete published article"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={!!postToDelete}
        onClose={() => setPostToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Story"
        itemTitle={postToDelete?.title}
        isDeleting={isDeleting}
      />
    </>
  );
}
