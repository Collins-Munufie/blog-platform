import Link from "next/link";
import { PenSquare, FileText, ArrowRight, Eye, MessageSquare } from "lucide-react";
import { getPosts } from "@/lib/api/posts";
import { getAnalyticsSummary } from "@/lib/api/analytics";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, formatCompactNumber } from "@/lib/utils";

export default async function DashboardPage() {
  const [allPosts, analytics] = await Promise.all([
    getPosts({ status: "all" }),
    getAnalyticsSummary(),
  ]);

  const recentDrafts = allPosts.filter((p) => p.status === "draft").slice(0, 3);
  const recentPublished = allPosts.filter((p) => p.status === "published").slice(0, 4);

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-10">
      <DashboardHeader
        title="Engineering Creator Studio"
        description="Welcome back, Elena. Here is your publication reach and drafting queue."
      />

      {/* Analytics KPI Overview */}
      <AnalyticsChart data={analytics} />

      {/* Two Column Section: Drafts Queue & Top Performing Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Working Drafts Queue */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Working Drafts ({recentDrafts.length})
              </h3>
              <p className="text-xs text-slate-400">Articles in progress</p>
            </div>
            <Link href="/dashboard/posts/new">
              <Button size="sm" variant="subtle" className="gap-1 text-xs">
                <PenSquare className="h-3 w-3" /> New Draft
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {recentDrafts.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No active drafts. You&apos;re completely up to date!
              </p>
            ) : (
              recentDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 truncate">
                      {draft.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {draft.readingTimeMinutes} min read • Updated {formatDate(draft.publishedAt)}
                    </p>
                  </div>
                  <Link href={`/dashboard/posts/${draft.id}/edit`}>
                    <Button size="sm" variant="outline" className="text-xs h-7 px-2.5">
                      Continue Edit
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Published Articles */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Top Performing Articles
              </h3>
              <p className="text-xs text-slate-400">Highest readership velocity</p>
            </div>
            <Link
              href="/dashboard/posts"
              className="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-1"
            >
              All posts <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentPublished.map((post) => (
              <div
                key={post.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Badge variant="indigo" size="sm">
                      {post.category.name}
                    </Badge>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono shrink-0">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-indigo-500" />
                    {formatCompactNumber(post.views)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
