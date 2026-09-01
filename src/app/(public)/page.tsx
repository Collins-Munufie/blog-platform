import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
  Cpu,
  Layout,
  Bot,
  Cloud,
  CheckCircle,
  Zap,
} from "lucide-react";
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

  const trackIcons = [Cpu, Layout, Bot, Cloud];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Featured Panel Atmosphere Hero */}
      {heroPost && (
        <section>
          <HeroPost post={heroPost} />
        </section>
      )}

      {/* Curriculum & Track Bento Grid inspired by dummyegator */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#20509b] dark:text-[#8ab1e3]">
              <Layers className="h-4 w-4 text-[#f4ae17]" />
              <span>Engineering Curriculum &amp; Tracks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#08214e] dark:text-white font-heading">
              Structured Architectural Pathways
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs font-bold text-[#20509b] dark:text-[#6394d6] hover:underline inline-flex items-center gap-1.5"
          >
            Browse all tracks &amp; tags <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, idx) => {
            const Icon = trackIcons[idx % trackIcons.length];
            return (
              <Link
                key={cat.id}
                href={`/categories?slug=${cat.slug}`}
                className="card-lift p-6 rounded-2xl group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-[#eef3fa] dark:bg-[#12346e] text-[#20509b] dark:text-[#8ab1e3] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#f4ae17] bg-[#fff9eb] dark:bg-[#f4ae17]/10 px-2.5 py-0.5 rounded-full border border-[#ffe299] dark:border-[#f4ae17]/20">
                      {cat.postCount} Deep-Dives
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#08214e] dark:text-white group-hover:text-[#20509b] dark:group-hover:text-[#6394d6] transition-colors font-heading">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-[#2f3b4d] dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e2e8f2] dark:border-[#1e3a6a] text-xs font-bold text-[#20509b] dark:text-[#8ab1e3] flex items-center justify-between">
                  <span>Explore Track</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trending Publications Section */}
      {secondaryFeatured.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#20509b] dark:text-[#8ab1e3]">
            <TrendingUp className="h-4 w-4 text-[#f4ae17]" />
            <span>High Readership Velocity</span>
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
            <h2 className="text-2xl font-bold tracking-tight text-[#08214e] dark:text-white font-heading">
              Latest Publications
            </h2>
            <p className="text-xs text-[#93a0b4] mt-0.5">
              Peer-reviewed technical deep-dives from staff engineers
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
