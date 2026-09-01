"use client";

import * as React from "react";
import {
  Eye,
  Heart,
  FileText,
  Clock,
  CheckCircle2,
  FileEdit,
  TrendingUp,
  Layers,
} from "lucide-react";
import { ExtendedAnalyticsSummary } from "@/lib/api/analytics";
import { formatCompactNumber } from "@/lib/utils";

export function AnalyticsChart({ data }: { data: ExtendedAnalyticsSummary }) {
  const maxViews = Math.max(...data.viewsTrend.map((d) => d.views), 1);

  return (
    <div className="space-y-6">
      {/* 4 Core Dynamic Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Catalog */}
        <div className="card-simple p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Articles
            </span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              {data.totalPosts}
            </p>
            <span className="text-xs font-medium text-slate-500">
              {data.publishedCount} published • {data.draftCount} drafts
            </span>
          </div>
        </div>

        {/* Real Dynamic Reads */}
        <div className="card-simple p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Cumulative Reads
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Eye className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              {formatCompactNumber(data.totalViews)}
            </p>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> Live metric
            </span>
          </div>
        </div>

        {/* Real Dynamic Reactions */}
        <div className="card-simple p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Reader Reactions
            </span>
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <Heart className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              {formatCompactNumber(data.totalLikes)}
            </p>
            <span className="text-xs font-medium text-slate-500">
              {data.totalLikes > 0 ? "Active engagement" : "No reactions yet"}
            </span>
          </div>
        </div>

        {/* Average Read Time */}
        <div className="card-simple p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Avg. Reading Depth
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              {data.avgReadTimeMinutes} <span className="text-base font-normal text-slate-400">min</span>
            </p>
            <span className="text-xs font-medium text-slate-500">Calculated word count</span>
          </div>
        </div>
      </div>

      {/* Readership Distribution & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Bar Chart */}
        <div className="lg:col-span-2 card-simple p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Readership Trajectory
              </h3>
              <p className="text-xs text-slate-500">Weekly traffic distribution across all active stories</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Real-time
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-4 pt-4">
            {data.viewsTrend.map((item, idx) => {
              const heightPercent = Math.max(15, Math.round((item.views / maxViews) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[11px] text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatCompactNumber(item.views)}
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800/80 rounded-xl h-36 flex items-end overflow-hidden p-1">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 rounded-lg transition-all duration-500 group-hover:brightness-110"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                    {item.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Topic Breakdown */}
        <div className="card-simple p-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Publication Balance
            </h3>
            <p className="text-xs text-slate-500">Distribution by topic taxonomy</p>
          </div>

          <div className="space-y-3.5 pt-1">
            {data.categoryBreakdown.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
                    {cat.name}
                  </span>
                  <span className="font-mono text-slate-500">{cat.count} ({cat.percentage}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${cat.percentage}%` }}
                    className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
