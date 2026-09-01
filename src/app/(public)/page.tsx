import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  MapPin,
  Coffee,
  BookOpen,
  Headphones,
  Compass,
  Layers,
  Twitter,
  Calendar,
} from "lucide-react";
import { getPosts, getFeaturedPosts } from "@/lib/api/posts";
import { getCategories } from "@/lib/api/categories";
import { MOCK_FIELD_NOTES, MOCK_NOW, MOCK_AUTHORS } from "@/lib/mock-data";
import { HeroPost } from "@/components/public/HeroPost";
import { PostCard } from "@/components/public/PostCard";
import { NewsletterCTA } from "@/components/public/NewsletterCTA";
import { formatDate, formatCompactNumber } from "@/lib/utils";

export const revalidate = 60;

export default async function HomePage() {
  const [allPosts, featuredPosts, categories] = await Promise.all([
    getPosts({ status: "published" }),
    getFeaturedPosts(),
    getCategories(),
  ]);

  const leadEssay = featuredPosts[0] || allPosts[0];
  const recentEssays = allPosts.filter((p) => p.id !== leadEssay?.id).slice(0, 4);
  const author = MOCK_AUTHORS[0];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* 1. Human Author Intro & Welcome Header */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <Image
              src={author.avatar}
              alt={author.name}
              width={72}
              height={72}
              priority
              className="rounded-2xl object-cover ring-2 ring-amber-500/80 shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 font-heading">
                  Khophi <span className="text-xs text-[#d97706] dark:text-[#f59e0b] font-mono font-bold">@khophi_the_blogger</span>
                </h1>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                Software Architect &amp; Writer based in <span className="text-stone-900 dark:text-white font-bold">Accra, Ghana 🇬🇭</span>
              </p>
            </div>
          </div>

          {/* Social & WhatsApp Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href="https://wa.me/233240000000"
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366]/15 text-[#128C7E] dark:text-[#25D366] hover:bg-[#25D366]/25 text-xs font-bold transition-colors border border-[#25D366]/30"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>WhatsApp Channel</span>
            </a>
            <Link
              href="/about"
              className="px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 text-xs font-semibold transition-colors"
            >
              My Story
            </Link>
          </div>
        </div>

        {/* Bio statement */}
        <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-normal pt-2 border-t border-stone-100 dark:border-stone-800/80">
          Welcome to my personal publication. I write honest, unfiltered essays on building startups across West Africa, the realities of mobile money infrastructure, Afrobeats culture, and daily life in Ghana.
        </p>
      </section>

      {/* 2. Lead Featured Essay */}
      {leadEssay && (
        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <Sparkles className="h-3.5 w-3.5" /> Latest Longform Essay
            </span>
            <span>{formatDate(leadEssay.publishedAt)}</span>
          </div>

          <HeroPost post={leadEssay} />
        </section>
      )}

      {/* 3. Field Notes / Quick Thoughts Feed ("From My Desk") */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-heading">
              Field Notes &amp; Quick Observations
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-mono">Short-form dispatches</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_FIELD_NOTES.map((note) => (
            <div
              key={note.id}
              className="card-simple p-4 sm:p-5 rounded-2xl space-y-2.5 flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                {note.content}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 font-medium">
                <span>{note.date} • {note.location}</span>
                <span className="editorial-tag text-[10px] font-bold px-2 py-0.5 rounded-full">
                  #{note.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Recent Essays */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-heading">
              Recent Essays &amp; Investigations
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Deep dives on fintech, music production, and Accra lifestyle
            </p>
          </div>
          <Link
            href="/archive"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
          >
            All essays ({allPosts.length}) <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentEssays.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 5. "Now" / What Khophi is Working on & Reading */}
      <section className="p-6 sm:p-8 rounded-3xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Now / Current Focus</span>
          </h3>
          <span className="text-[11px] text-stone-500 font-mono">Updated Aug 2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
          <div className="p-4 rounded-xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-stone-100">
              <Compass className="h-3.5 w-3.5 text-amber-600" />
              <span>Building</span>
            </div>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              {MOCK_NOW.currentProject}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-stone-100">
              <BookOpen className="h-3.5 w-3.5 text-blue-600" />
              <span>Reading</span>
            </div>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              {MOCK_NOW.reading}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-stone-100">
              <Headphones className="h-3.5 w-3.5 text-rose-600" />
              <span>Listening</span>
            </div>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              {MOCK_NOW.listening}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Intimate Newsletter CTA */}
      <section className="pt-2">
        <NewsletterCTA />
      </section>
    </div>
  );
}
