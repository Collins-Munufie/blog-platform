import { getPosts, getFeaturedPosts } from "@/lib/api/posts";
import { MOCK_FIELD_NOTES, MOCK_NOW } from "@/lib/mock-data";
import { LivePostGrid } from "@/components/public/LivePostGrid";
import { NewsletterCTA } from "@/components/public/NewsletterCTA";
import { Coffee, BookOpen, Headphones, Compass } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [allPosts, featuredPosts] = await Promise.all([
    getPosts({ status: "published" }),
    getFeaturedPosts(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* 1. Live Synchronized Story Feed (Featured Story + Recent Articles) */}
      <LivePostGrid
        initialPosts={allPosts}
        initialFeatured={featuredPosts[0] || allPosts[0]}
      />

      {/* 2. Field Notes & Quick Observations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-heading">
              Field Notes &amp; Quick Observations
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-mono">Dispatches from Accra</span>
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

      {/* 3. "Now" / What Khophi is Working on & Reading */}
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

      {/* 4. Sunday Letter Newsletter */}
      <section className="pt-2">
        <NewsletterCTA />
      </section>
    </div>
  );
}
