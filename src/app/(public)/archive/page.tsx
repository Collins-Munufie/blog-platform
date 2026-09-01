import Link from "next/link";
import { Archive, Calendar, Eye, Heart, Clock, ArrowRight, Tag as TagIcon } from "lucide-react";
import { getPosts } from "@/lib/api/posts";
import { getCategories, getTags } from "@/lib/api/categories";
import { formatDate, formatCompactNumber } from "@/lib/utils";

export const revalidate = 60;

export default async function ArchivePage() {
  const [posts, categories, tags] = await Promise.all([
    getPosts({ status: "published" }),
    getCategories(),
    getTags(),
  ]);

  // Group posts by Year
  const groupedByYear: Record<string, typeof posts> = {};
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
          Complete catalog of {posts.length} articles, analyses, and culture essays published by <span className="font-bold text-[#08214e] dark:text-white">khophi_the_blogger</span>.
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
            <span className="text-[10px] text-[#93a0b4] font-mono">({cat.postCount})</span>
          </Link>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="space-y-12">
        {years.map((year) => (
          <section key={year} className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#e2e8f2] dark:border-[#1e3a6a] pb-3">
              <Calendar className="h-5 w-5 text-[#f59e0b]" />
              <h2 className="text-2xl font-extrabold text-[#08214e] dark:text-white font-heading">
                {year}
              </h2>
              <span className="text-xs text-[#93a0b4] font-mono font-bold">
                ({groupedByYear[year].length} publications)
              </span>
            </div>

            <div className="space-y-3">
              {groupedByYear[year].map((post) => (
                <div
                  key={post.id}
                  className="card-lift p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono text-[#93a0b4] text-[11px]">
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="brand-tag-gold text-[10px] font-bold px-2 py-0.2 rounded-full">
                        {post.category.name}
                      </span>
                      <span className="text-[11px] text-[#93a0b4]">
                        {post.readingTimeMinutes} min read
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-base font-bold text-[#08214e] dark:text-white group-hover:text-[#20509b] dark:group-hover:text-[#8ab1e3] transition-colors font-heading">
                        {post.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#93a0b4] shrink-0">
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
                      className="p-2 rounded-xl bg-[#eef3fa] dark:bg-[#12346e] text-[#20509b] dark:text-white hover:scale-105 transition-transform"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
