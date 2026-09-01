"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  Heart,
  Calendar,
  FilePlus,
} from "lucide-react";
import { Post, PostStatus } from "@/lib/types";
import { deletePost } from "@/lib/api/posts";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, formatCompactNumber } from "@/lib/utils";

export function PostDataTable({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);
  const [activeTab, setActiveTab] = React.useState<"all" | PostStatus>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesTab = activeTab === "all" ? true : post.status === activeTab;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      return;
    }
    setDeletingId(id);
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  };

  const getStatusBadge = (status: PostStatus) => {
    switch (status) {
      case "published":
        return <Badge variant="success">Published</Badge>;
      case "draft":
        return <Badge variant="warning">Draft</Badge>;
      case "scheduled":
        return <Badge variant="indigo">Scheduled</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar: Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/75 dark:border-slate-800 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Article Title</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Metrics</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <p className="font-medium text-sm text-slate-600 dark:text-slate-300 mb-1">
                      No posts found
                    </p>
                    <p className="text-xs">Try changing the filter or create a new article.</p>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4 max-w-sm">
                      <Link
                        href={`/dashboard/posts/${post.id}/edit`}
                        className="font-semibold text-sm text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 line-clamp-1"
                      >
                        {post.title}
                      </Link>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        /{post.slug}
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="indigo" size="sm">
                        {post.category.name}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(post.status)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          {formatCompactNumber(post.views)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3.5 w-3.5 text-red-500" />
                          {formatCompactNumber(post.likes)}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      {formatDate(post.publishedAt)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          title="View live article"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/dashboard/posts/${post.id}/edit`}
                          title="Edit article"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-slate-100 dark:hover:text-primary-400 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          title="Delete article"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
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
