import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp, Layers } from "lucide-react";
import { getPosts, getFeaturedPosts } from "@/lib/api/posts";
import { getCategories } from "@/lib/api/categories";
import { HeroPost } from "@/components/public/HeroPost";
import { PostCard } from "@/components/public/PostCard";
import { NewsletterCTA } from "@/components/public/NewsletterCTA";
import { Button } from "@/components/ui/Button";

export const revalidate = 60; // ISR revalidation

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800 text-xs font-semibold text-primary-700 dark:text-primary-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Modern Engineering Publication</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          Architecting for <span className="bg-gradient-to-r from-primary-600 to-indigo-500 bg-clip-text text-transparent">Scale & Precision</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          Deep architectural case studies, performance benchmarks, and real-world implementation guides for modern software teams.
        </p>
      </div>

      {/* Hero Featured Article */}
      {heroPost && (
        <section>
          <HeroPost post={heroPost} />
        </section>
      )}

      {/* Category Pills Explorer */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            <Layers className="h-4 w-4 text-primary-600" />
            <span>Explore Engineering Tracks</span>
          </div>
          <Link
            href="/categories"
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 inline-flex items-center gap-1"
          >
            View all topics <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories?slug=${cat.slug}`}
              className="p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-primary-500/50 dark:border-slate-800/80 dark:bg-slate-900/40 transition-all hover:shadow-md group"
            >
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {cat.description}
              </p>
              <div className="mt-3 text-[11px] font-semibold text-primary-600 dark:text-primary-400">
                {cat.postCount} Deep-Dives →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Secondary Featured / Trending Posts */}
      {secondaryFeatured.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            <TrendingUp className="h-4 w-4 text-primary-600" />
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
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Recent Publications
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Fresh technical insights published this week
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
      <section className="pt-8">
        <NewsletterCTA />
      </section>
    </div>
  );
}
