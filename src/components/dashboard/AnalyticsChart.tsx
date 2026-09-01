"use client";

import * as React from "react";
import { Eye, Heart, MessageSquare, Clock, TrendingUp } from "lucide-react";
import { AnalyticsSummary } from "@/lib/types";
import { formatCompactNumber } from "@/lib/utils";

export function AnalyticsChart({ data }: { data: AnalyticsSummary }) {
  const maxViews = Math.max(...data.viewsTrend.map((d) => d.views));

  return (
    <div className="space-y-8">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Reads</span>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Eye className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {formatCompactNumber(data.totalViews)}
            </p>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" /> +18.4%
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Reactions & Claps</span>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
              <Heart className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {formatCompactNumber(data.totalLikes)}
            </p>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" /> +12.1%
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Discussions</span>
            <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {data.totalComments}
            </p>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" /> +5.7%
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Read Time</span>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {data.avgReadTimeMinutes} min
            </p>
            <span className="text-xs font-medium text-slate-400">Top 5% sector</span>
          </div>
        </div>
      </div>

      {/* Main Chart + Traffic Sources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Visualization (SVG Bar Chart) */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Readership & Engagement Growth
              </h3>
              <p className="text-xs text-slate-400">30-day traffic velocity</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Last 30 Days
            </span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6">
            {data.viewsTrend.map((item, idx) => {
              const heightPercent = Math.round((item.views / maxViews) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {formatCompactNumber(item.views)}
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-44 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-primary-600 to-indigo-400 dark:from-primary-500 dark:to-indigo-400 rounded-t transition-all duration-500 group-hover:brightness-110"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {item.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Traffic Sources
            </h3>
            <p className="text-xs text-slate-400">Where readers discover articles</p>
          </div>

          <div className="space-y-4">
            {data.trafficSources.map((source) => (
              <div key={source.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {source.name}
                  </span>
                  <span className="font-mono text-slate-400">{source.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{
                      width: `${source.percentage}%`,
                      backgroundColor: source.color,
                    }}
                    className="h-full rounded-full"
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
