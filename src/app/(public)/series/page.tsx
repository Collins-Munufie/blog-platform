import Link from "next/link";
import Image from "next/image";
import { Layers, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { MOCK_SERIES } from "@/lib/mock-data";
import { getPosts } from "@/lib/api/posts";

export const revalidate = 60;

export default async function SeriesPage() {
  const posts = await getPosts({ status: "published" });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#eef3fa] dark:bg-[#12346e] text-[#20509b] dark:text-[#8ab1e3]">
          <Layers className="h-3.5 w-3.5 text-[#f59e0b]" />
          <span>Curated Collections</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#08214e] dark:text-white font-heading">
          Editorial Series &amp; Deep-Dives
        </h1>
        <p className="text-sm sm:text-base text-[#2f3b4d] dark:text-slate-300 leading-relaxed">
          Multi-part investigations into Silicon Accra venture funding, mobile money rails, creative arts economics, and African football data analytics.
        </p>
      </div>

      {/* Series Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_SERIES.map((series) => {
          const seriesPosts = posts.filter(
            (p) => p.series && p.series.id === series.id
          );

          return (
            <div
              key={series.id}
              className="card-lift rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={series.coverImage}
                    alt={series.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041536]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-[#f59e0b] text-[#08214e] font-black text-xs px-2.5 py-0.5 rounded-full shadow-md">
                      {series.postCount} Parts
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-[#08214e] dark:text-white group-hover:text-[#20509b] dark:group-hover:text-[#8ab1e3] transition-colors font-heading">
                    {series.title}
                  </h3>
                  <p className="text-xs text-[#2f3b4d] dark:text-slate-300 leading-relaxed line-clamp-3">
                    {series.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#e2e8f2] dark:border-[#1e3a6a] space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#93a0b4]">
                    Articles in this series:
                  </p>
                  <div className="space-y-1.5">
                    {seriesPosts.map((sp, idx) => (
                      <Link
                        key={sp.id}
                        href={`/blog/${sp.slug}`}
                        className="flex items-center justify-between text-xs font-semibold text-[#08214e] dark:text-slate-200 hover:text-[#20509b] dark:hover:text-[#8ab1e3] p-1.5 rounded-lg hover:bg-[#eef3fa] dark:hover:bg-[#12346e]/40 transition-colors"
                      >
                        <span className="truncate">
                          Part {idx + 1}: {sp.title}
                        </span>
                        <ArrowRight className="h-3 w-3 shrink-0 ml-2 text-[#93a0b4]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
