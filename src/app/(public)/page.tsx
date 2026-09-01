import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp, Layers, BookOpen } from "lucide-react";
import { getPosts, getFeaturedPosts } from "@/lib/api/posts";
import { getCategories } from "@/lib/api/categories";
import { HeroPost } from "@/components/public/HeroPost";
import { PostCard } from "@/components/public/PostCard";
import { NewsletterCTA } from "@/components/public/NewsletterCTA";

export const revalidate = 60;

export default async function HomePage() {
  const [allPosts, featuredPosts, categories] = await Promise.all([
    getPosts({ status: "published" }),
    getFeaturedPosts(),
    getCategories(),
  ]);

  const heroPost = featuredPosts[0] || allPosts[0];
  const secondaryFeatured = featuredPosts.slice(1, 3);
  const remainingPosts = allPosts.filter(
    (p) => p.id !== heroPost?.id && !secondaryFeatured.some((sf) => sf.id === p.id)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-14">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Engineering Architecture &amp; System Design</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] font-heading">
          Engineering for <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent">Scale &amp; Precision</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-sans">
          Deep architectural case studies, zero-downtime database strategies, and modern TypeScript implementations for engineering teams.
        </p>
      </div>

      {/* Hero Featured Article */}
      {heroPost && (
        <section>
          <HeroPost post={heroPost} />
        </section>
      )}

      {/* Category Navigation Pills */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Layers className="h-4 w-4 text-blue-600" />
            <span>Architecture Tracks</span>
          </div>
          <Link
            href="/categories"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center gap-1"
          >
            Explore all topics <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories?slug=${cat.slug}`}
              className="card-simple card-hover p-5 group"
            >
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-heading">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-3 text-[11px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <span>{cat.postCount} Deep-Dives</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Secondary Featured / Trending Posts */}
      {secondaryFeatured.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span>Trending Technical Guides</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryFeatured.map((post) => (
              <PostCard key={post.id} post={post} variant="horizontal" />
            ))}
          </div>
        </section>
      )}

      {/* Latest Feed Grid */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
              Recent Publications
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Peer-reviewed technical writing from our staff contributors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="pt-4">
        <NewsletterCTA />
      </section>
    </div>
  );
}
