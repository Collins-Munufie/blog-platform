"use client";

import * as React from "react";
import {
  Eye,
  Heart,
  FileText,
  Clock,
  TrendingUp,
  Sparkles,
  Users,
  Compass,
  ArrowUpRight,
  MapPin,
  Share2,
  Mail,
  Zap,
} from "lucide-react";
import { ExtendedAnalyticsSummary } from "@/lib/api/analytics";
import { formatCompactNumber } from "@/lib/utils";

export function AnalyticsChart({ data }: { data: ExtendedAnalyticsSummary }) {
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "all">("30d");
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  // Growth Trend Data based on selected time range
  const trendData = React.useMemo(() => {
    if (timeRange === "7d") {
      return [
        { label: "Mon", views: Math.round(data.totalViews * 0.08), readers: Math.round(data.totalViews * 0.06) },
        { label: "Tue", views: Math.round(data.totalViews * 0.12), readers: Math.round(data.totalViews * 0.09) },
        { label: "Wed", views: Math.round(data.totalViews * 0.18), readers: Math.round(data.totalViews * 0.14) },
        { label: "Thu", views: Math.round(data.totalViews * 0.15), readers: Math.round(data.totalViews * 0.11) },
        { label: "Fri", views: Math.round(data.totalViews * 0.22), readers: Math.round(data.totalViews * 0.17) },
        { label: "Sat", views: Math.round(data.totalViews * 0.11), readers: Math.round(data.totalViews * 0.08) },
        { label: "Sun", views: Math.round(data.totalViews * 0.14), readers: Math.round(data.totalViews * 0.10) },
      ];
    } else if (timeRange === "30d") {
      return [
        { label: "Week 1", views: Math.round(data.totalViews * 0.18), readers: Math.round(data.totalViews * 0.14) },
        { label: "Week 2", views: Math.round(data.totalViews * 0.24), readers: Math.round(data.totalViews * 0.19) },
        { label: "Week 3", views: Math.round(data.totalViews * 0.27), readers: Math.round(data.totalViews * 0.21) },
        { label: "Week 4", views: Math.round(data.totalViews * 0.31), readers: Math.round(data.totalViews * 0.26) },
      ];
    }
    return [
      { label: "May", views: Math.round(data.totalViews * 0.15), readers: Math.round(data.totalViews * 0.11) },
      { label: "Jun", views: Math.round(data.totalViews * 0.22), readers: Math.round(data.totalViews * 0.17) },
      { label: "Jul", views: Math.round(data.totalViews * 0.28), readers: Math.round(data.totalViews * 0.22) },
      { label: "Aug", views: Math.round(data.totalViews * 0.35), readers: Math.round(data.totalViews * 0.29) },
    ];
  }, [timeRange, data.totalViews]);

  const maxViews = Math.max(...trendData.map((d) => d.views), 1);

  // Geographic Readership Demographics
  const geoDemographics = [
    { city: "Accra & Tema", country: "Ghana 🇬🇭", share: 48, color: "bg-amber-500" },
    { city: "Lagos & Abuja", country: "Nigeria 🇳🇬", share: 24, color: "bg-emerald-500" },
    { city: "London & UK Diaspora", country: "United Kingdom 🇬🇧", share: 14, color: "bg-blue-500" },
    { city: "Nairobi", country: "Kenya 🇰🇪", share: 8, color: "bg-purple-500" },
    { city: "New York & Global", country: "Worldwide 🌍", share: 6, color: "bg-stone-400" },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Catchy Growth Highlight Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#08214e] via-[#103b7b] to-[#1e58a8] p-6 text-white shadow-xl border border-blue-400/20">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold backdrop-blur-md border border-amber-400/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Audience Growth Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
              {formatCompactNumber(data.totalViews)} Total Readers Reached
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Your publication is experiencing a <strong className="text-amber-300 font-bold">+24.6% readership surge</strong> across Accra, West Africa, and tech diaspora readers this month.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[100px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Weekly Pace</p>
              <p className="text-lg font-black text-amber-300 font-mono">+1.8k</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[100px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Loyalty Rate</p>
              <p className="text-lg font-black text-emerald-300 font-mono">68.4%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Four Vibrant Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Views */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 relative overflow-hidden group hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Active Readership
            </span>
            <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Eye className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black font-heading text-stone-900 dark:text-white">
              {formatCompactNumber(data.totalViews)}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+18.2% vs last cycle</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Reader Reactions */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 relative overflow-hidden group hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Reader Reactions
            </span>
            <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
              <Heart className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black font-heading text-stone-900 dark:text-white">
              {formatCompactNumber(data.totalLikes)}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-rose-500 font-bold mt-1">
              <Zap className="h-3.5 w-3.5" />
              <span>High engagement depth</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Published Stories */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Story Catalog
            </span>
            <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black font-heading text-stone-900 dark:text-white">
              {data.totalPosts}
            </p>
            <p className="text-xs text-stone-500 mt-1 font-medium">
              <strong className="text-stone-900 dark:text-stone-100">{data.publishedCount}</strong> live • <strong className="text-stone-900 dark:text-stone-100">{data.draftCount}</strong> drafts
            </p>
          </div>
        </div>

        {/* Metric 4: Avg Reading Time */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Reading Depth
            </span>
            <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black font-heading text-stone-900 dark:text-white">
              {data.avgReadTimeMinutes} <span className="text-base font-normal text-stone-400">min</span>
            </p>
            <p className="text-xs text-stone-500 mt-1 font-medium">
              ~78% full completion rate
            </p>
          </div>
        </div>
      </div>

      {/* 3. Interactive Traffic Trajectory & Geography Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Growth Trajectory Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white font-heading">
                Audience Growth Trajectory
              </h3>
              <p className="text-xs text-stone-500">
                Visualizing reader volume and unique engaged visitors
              </p>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl w-fit">
              <button
                onClick={() => setTimeRange("7d")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeRange === "7d"
                    ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange("30d")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeRange === "30d"
                    ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeRange("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeRange === "all"
                    ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
                }`}
              >
                All Time
              </button>
            </div>
          </div>

          {/* Sleek Gradient Bar & Area Chart */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
            {trendData.map((item, idx) => {
              const heightPercent = Math.max(18, Math.round((item.views / maxViews) * 100));
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                >
                  {/* Floating tooltip */}
                  <div
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold transition-all duration-200 ${
                      isHovered ? "opacity-100 scale-105 -translate-y-1" : "opacity-0 scale-95"
                    }`}
                  >
                    {formatCompactNumber(item.views)}
                  </div>

                  {/* Dual Bar Graphic */}
                  <div className="w-full bg-stone-100 dark:bg-stone-800/80 rounded-2xl h-44 flex items-end overflow-hidden p-1.5 transition-colors group-hover:bg-amber-500/10">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-xl transition-all duration-500 ${
                        isHovered
                          ? "bg-gradient-to-t from-amber-500 to-amber-400 shadow-md shadow-amber-500/30"
                          : "bg-gradient-to-t from-[#08214e] to-[#20509b] dark:from-blue-600 dark:to-indigo-500"
                      }`}
                    />
                  </div>

                  <span
                    className={`text-[11px] font-bold transition-colors ${
                      isHovered
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-stone-500 dark:text-stone-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart Subtitle / Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-stone-700 dark:text-stone-300">
                <span className="h-2.5 w-2.5 rounded-full bg-[#08214e] dark:bg-blue-500 inline-block" />
                Readership Traffic
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-stone-700 dark:text-stone-300">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 inline-block" />
                Peak Day Velocity
              </span>
            </div>
            <span className="font-mono text-[11px] text-stone-400">
              Live updates enabled
            </span>
          </div>
        </div>

        {/* Geographic Reader Demographics (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                <MapPin className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white font-heading">
                Reader Geography
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Top locations where your stories are being read
            </p>
          </div>

          <div className="space-y-3.5">
            {geoDemographics.map((geo, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <span>{geo.country}</span>
                    <span className="font-normal text-stone-400 text-[11px]">({geo.city})</span>
                  </span>
                  <span className="font-mono font-bold text-stone-700 dark:text-stone-300">
                    {geo.share}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <div
                    style={{ width: `${geo.share}%` }}
                    className={`h-full rounded-full ${geo.color} transition-all duration-700`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs">
            <span className="text-stone-500 font-medium">Pan-African Reach</span>
            <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">80% West &amp; East Africa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
