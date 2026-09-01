import Link from "next/link";
import {
  PenSquare,
  FileText,
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Edit,
} from "lucide-react";
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

  const recentDrafts = allPosts.filter((p) => p.status === "draft").slice(0, 4);
  const recentPublished = allPosts.filter((p) => p.status === "published").slice(0, 4);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Creator Studio & Analytics"
        description="Monitor real reader engagement, publish drafts, and maintain your technical catalog."
      />

      {/* Real Dynamic Analytics Overview */}
      <AnalyticsChart data={analytics} />

      {/* Drafts Queue & Top Performing Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Working Drafts Queue */}
        <div className="card-simple p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Working Drafts ({recentDrafts.length})
              </h3>
              <p className="text-xs text-slate-500">Unpublished stories in progress</p>
            </div>
            <Link href="/dashboard/posts/new">
              <Button size="sm" variant="subtle" className="gap-1.5 text-xs h-8">
                <PenSquare className="h-3.5 w-3.5" /> New Draft
              </Button>
            </Link>
          </div>

          <div className="space-y-3 pt-1">
            {recentDrafts.length === 0 ? (
              <div className="text-center py-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  All caught up! No pending drafts.
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Click &ldquo;New Draft&rdquo; to start drafting your next article.
                </p>
              </div>
            ) : (
              recentDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between gap-3 group hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 truncate">
                      {draft.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {draft.readingTimeMinutes} min read • Updated {formatDate(draft.publishedAt)}
                    </p>
                  </div>
                  <Link href={`/dashboard/posts/${draft.id}/edit`}>
                    <Button size="sm" variant="outline" className="text-xs h-7 px-3 shrink-0">
                      Edit
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Published Articles */}
        <div className="card-simple p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Recent Publications
              </h3>
              <p className="text-xs text-slate-500">Live articles receiving traffic</p>
            </div>
            <Link
              href="/dashboard/posts"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              All articles ({allPosts.length}) <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3 pt-1">
            {recentPublished.map((post) => (
              <div
                key={post.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between gap-3 group hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 truncate">
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
                <div className="flex items-center gap-2 shrink-0">
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                    <Eye className="h-3 w-3 text-blue-500" />
                    {formatCompactNumber(post.views)}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    title="View live"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
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
