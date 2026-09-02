"use client";

import * as React from "react";
import Link from "next/link";
import { Archive, Calendar, Eye, Heart, Clock, ArrowRight } from "lucide-react";
import { Post, Category } from "@/lib/types";
import { getPosts } from "@/lib/api/posts";
import { formatDate, formatCompactNumber } from "@/lib/utils";

export function LiveArchiveView({
  initialPosts,
  initialCategories,
}: {
  initialPosts: Post[];
  initialCategories: Category[];
}) {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);
  const [categories] = React.useState<Category[]>(initialCategories);

  React.useEffect(() => {
    const sync = async () => {
      try {
        const latest = await getPosts({ status: "published" });
        if (latest && latest.length > 0) {
          setPosts(latest);
        }
      } catch {}
    };

    sync();
    window.addEventListener("posts_updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("posts_updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const groupedByYear: Record<string, Post[]> = {};
  posts.forEach((post) => {
    const year = new Date(post.publishedAt).getFullYear().toString();
    if (!groupedByYear[year]) groupedByYear[year] = [];
    groupedByYear[year].push(post);
  });

  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#eef3fa] dark:bg-[#12346e] text-[#20509b] dark:text-[#8ab1e3]">
          <Archive className="h-3.5 w-3.5" />
          <span>Chronological Index</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#08214e] dark:text-white font-heading">
          The Publication Archive
        </h1>
        <p className="text-sm sm:text-base text-[#2f3b4d] dark:text-slate-300 leading-relaxed">
          Complete catalog of {posts.length} articles, analyses, and culture essays published by{" "}
          <span className="font-bold text-[#08214e] dark:text-white">khophi_the_blogger</span>.
        </p>
      </div>

      {/* Category Shortcuts */}
      <div className="flex flex-wrap gap-2 pt-1">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories?slug=${cat.slug}`}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#08214e] text-xs font-semibold text-[#08214e] dark:text-slate-200 border border-[#e2e8f2] dark:border-[#1e3a6a] hover:border-[#20509b] transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>{cat.name}</span>
            <span className="text-[10px] text-[#93a0b4] font-mono">
              ({posts.filter((p) => p.category.id === cat.id).length})
            </span>
          </Link>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="space-y-12">
        {years.map((year) => (
          <section key={year} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black text-[#08214e] dark:text-white font-mono">
                {year}
              </h2>
              <div className="h-px flex-1 bg-[#e2e8f2] dark:bg-[#1e3a6a]" />
              <span className="text-xs font-bold text-[#93a0b4]">
                {groupedByYear[year].length} stories
              </span>
            </div>

            <div className="divide-y divide-[#e2e8f2] dark:divide-[#1e3a6a] border-y border-[#e2e8f2] dark:border-[#1e3a6a]">
              {groupedByYear[year].map((post) => (
                <article
                  key={post.id}
                  className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#eef3fa]/50 dark:hover:bg-[#12346e]/20 px-3 -mx-3 rounded-xl transition-colors"
                >
                  <div className="space-y-1 sm:max-w-2xl">
                    <div className="flex items-center gap-2 text-xs text-[#93a0b4]">
                      <span className="font-semibold text-[#20509b] dark:text-[#8ab1e3]">
                        {post.category.name}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTimeMinutes} min
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="block">
                      <h3 className="text-base sm:text-lg font-bold text-[#08214e] dark:text-white group-hover:text-[#20509b] dark:group-hover:text-[#8ab1e3] transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 font-mono text-xs text-[#93a0b4]">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5 text-[#20509b]" />
                      {formatCompactNumber(post.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 text-rose-500" />
                      {formatCompactNumber(post.likes)}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="p-1.5 rounded-lg text-[#93a0b4] group-hover:text-[#08214e] dark:group-hover:text-white transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
