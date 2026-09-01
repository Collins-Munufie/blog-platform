"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  Heart,
  Download,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  X,
  FilePlus,
} from "lucide-react";
import { Post, PostStatus } from "@/lib/types";
import { deletePost, updatePost } from "@/lib/api/posts";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, formatCompactNumber } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export function PostDataTable({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);
  const [activeTab, setActiveTab] = React.useState<"all" | PostStatus>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState<"date" | "views" | "title">("date");
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleToggleStatus = async (post: Post) => {
    const nextStatus: PostStatus = post.status === "published" ? "draft" : "published";
    setUpdatingStatusId(post.id);
    try {
      const updated = await updatePost(post.id, { status: nextStatus });
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
      toast({
        title: nextStatus === "published" ? "Article Published" : "Article Set to Draft",
        description: `"${post.title}" is now ${nextStatus}.`,
        type: "success",
      });
    } catch {
      toast({
        title: "Failed to update status",
        type: "error",
      });
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }
    setDeletingId(id);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Article Deleted",
        description: `"${title}" was removed from your publication.`,
        type: "info",
      });
    } catch {
      toast({
        title: "Failed to delete article",
        type: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `devlog-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    toast({
      title: "Catalog Exported",
      description: "JSON backup downloaded to your computer.",
      type: "success",
    });
  };

  // Filter & Sort
  const filteredPosts = posts
    .filter((post) => {
      const matchesTab = activeTab === "all" ? true : post.status === activeTab;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  return (
    <div className="space-y-4">
      {/* Controls Bar: Tabs, Search Filter, Sort, and Export */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl w-fit border border-slate-200 dark:border-slate-800">
          {(["all", "published", "draft"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {tab === "all" ? "All Posts" : `${tab}s`} (
              {
                tab === "all"
                  ? posts.length
                  : posts.filter((p) => p.status === tab).length
              }
              )
            </button>
          ))}
        </div>

        {/* Right Search, Sort, and Export Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Live Search */}
          <div className="relative min-w-[220px] flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by title, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 px-2.5 py-1 text-xs">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-400 mr-1.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer text-xs"
            >
              <option value="date">Sort by Recent</option>
              <option value="views">Sort by Views</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>

          {/* Export JSON Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJSON}
            className="gap-1.5 text-xs h-8 border-slate-200 dark:border-slate-800"
            title="Download JSON backup"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden card-simple shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200/80 bg-slate-50/75 dark:border-slate-800 dark:bg-slate-900 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Article Details</th>
                <th className="px-5 py-3.5">Topic</th>
                <th className="px-5 py-3.5">Status & Toggle</th>
                <th className="px-5 py-3.5">Engagement</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <p className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-1">
                      No matching articles found
                    </p>
                    <p className="text-xs">Try adjusting your search criteria or create a new article.</p>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-5 py-4 max-w-xs sm:max-w-sm">
                      <Link
                        href={`/dashboard/posts/${post.id}/edit`}
                        className="font-semibold text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1"
                      >
                        {post.title}
                      </Link>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-mono truncate">
                        /blog/{post.slug}
                      </p>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <Badge variant="indigo" size="sm">
                        {post.category.name}
                      </Badge>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(post)}
                        disabled={updatingStatusId === post.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${
                          post.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                            : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800"
                        }`}
                        title="Click to toggle status between Published and Draft"
                      >
                        {post.status === "published" ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 text-amber-600" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap font-mono">
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5 text-blue-500" />
                          {formatCompactNumber(post.views)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3.5 w-3.5 text-rose-500" />
                          {formatCompactNumber(post.likes)}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-slate-400">
                      {formatDate(post.publishedAt)}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/blog/${post.slug}`}
                          title="View live article"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/dashboard/posts/${post.id}/edit`}
                          title="Edit article in Studio"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:text-blue-400 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deletingId === post.id}
                          title="Delete article"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
