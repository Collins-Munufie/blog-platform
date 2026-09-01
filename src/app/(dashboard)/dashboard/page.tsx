import Link from "next/link";
import {
  PenSquare,
  FileText,
  ArrowRight,
  Eye,
  Heart,
  Clock,
  Edit,
  ExternalLink,
} from "lucide-react";
import { getPosts } from "@/lib/api/posts";
import { getAnalyticsSummary } from "@/lib/api/analytics";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { Button } from "@/components/ui/Button";
import { formatDate, formatCompactNumber } from "@/lib/utils";

export const revalidate = 0;

export default async function DashboardPage() {
  const [allPosts, analytics] = await Promise.all([
    getPosts({ status: "all" }),
    getAnalyticsSummary(),
  ]);

  const recentDrafts = allPosts.filter((p) => p.status === "draft").slice(0, 4);
  const recentPublished = allPosts.filter((p) => p.status === "published").slice(0, 4);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Studio Overview"
        description="Your writing dashboard and audience statistics."
      />

      {/* Analytics Overview */}
      <AnalyticsChart data={analytics} />

      {/* Drafts & Published Stories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Working Drafts */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
                Drafts in Progress
              </h3>
              <p className="text-xs text-stone-500">
                {recentDrafts.length} unpublished draft{recentDrafts.length === 1 ? "" : "s"}
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
            {recentDrafts.length === 0 ? (
              <p className="py-6 text-xs text-stone-400 text-center">No drafts in progress.</p>
            ) : (
              recentDrafts.map((draft) => (
                <div key={draft.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      {draft.title}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      {draft.category.name} • {draft.readingTimeMinutes} min read
                    </p>
                  </div>
                  <Link href={`/dashboard/posts/${draft.id}/edit`}>
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-1 rounded-xl">
                      <Edit className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recently Published */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
                Recent Published Stories
              </h3>
              <p className="text-xs text-stone-500">
                {recentPublished.length} live stories
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
            {recentPublished.map((post) => (
              <div key={post.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                    {post.title}
                  </p>
                  <p className="text-[11px] text-stone-500 flex items-center gap-2">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Eye className="h-3 w-3" /> {formatCompactNumber(post.views)}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Heart className="h-3 w-3 text-rose-500" /> {formatCompactNumber(post.likes)}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xl" title="View story">
                      <ExternalLink className="h-3.5 w-3.5 text-stone-500" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/posts/${post.id}/edit`}>
                    <Button variant="outline" size="sm" className="h-8 text-xs rounded-xl">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
