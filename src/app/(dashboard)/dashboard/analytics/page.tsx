import { getAnalyticsSummary } from "@/lib/api/analytics";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { formatCompactNumber } from "@/lib/utils";
import Link from "next/link";
import { Eye, Heart, ExternalLink } from "lucide-react";

export default async function DashboardAnalyticsPage() {
  const analytics = await getAnalyticsSummary();

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Audience & Growth Analytics"
        description="Comprehensive readership metrics, traffic velocity, and content distribution insights."
      />

      <AnalyticsChart data={analytics} />

      {/* Top Performing Stories Table */}
      <div className="p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          All-Time Highest Readership Articles
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {analytics.topPosts.map((post, idx) => (
            <div
              key={post.id}
              className="py-3.5 flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="font-mono text-xs font-bold text-slate-400 w-5">
                  #{idx + 1}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-xs font-semibold text-slate-900 dark:text-white hover:text-primary-600 truncate flex items-center gap-1.5"
                >
                  {post.title}
                  <ExternalLink className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>

              <div className="flex items-center gap-6 text-xs text-slate-500 font-mono shrink-0">
                <span className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-indigo-500" />
                  {formatCompactNumber(post.views)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-red-500" />
                  {formatCompactNumber(post.likes)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
