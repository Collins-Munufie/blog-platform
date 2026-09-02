"use client";

import * as React from "react";
import Link from "next/link";
import { Tag as TagIcon, ArrowRight } from "lucide-react";
import { Category, Tag, Post } from "@/lib/types";
import { getPosts } from "@/lib/api/posts";
import { PostCard } from "@/components/public/PostCard";
import { Badge } from "@/components/ui/Badge";

export function LiveCategoryView({
  initialCategories,
  initialTags,
  initialPosts,
  currentCategorySlug,
  currentTagSlug,
}: {
  initialCategories: Category[];
  initialTags: Tag[];
  initialPosts: Post[];
  currentCategorySlug?: string;
  currentTagSlug?: string;
}) {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);
  const [categories] = React.useState<Category[]>(initialCategories);
  const [tags] = React.useState<Tag[]>(initialTags);

  React.useEffect(() => {
    const sync = async () => {
      try {
        const latest = await getPosts({
          status: "published",
          categorySlug: currentCategorySlug,
          tagSlug: currentTagSlug,
        });
        if (latest) {
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
  }, [currentCategorySlug, currentTagSlug]);

  const activeCategory = categories.find((c) => c.slug === currentCategorySlug);
  const activeTag = tags.find((t) => t.slug === currentTagSlug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
          Topics &amp; Tracks
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Filter essays and field reports across African tech, Mobile Money infrastructure, culture, and football.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const isActive = category.slug === currentCategorySlug;
          const count = posts.filter((p) => p.category.id === category.id).length;
          return (
            <Link
              key={category.id}
              href={isActive ? "/categories" : `/categories?slug=${category.slug}`}
              className={`p-5 rounded-2xl border transition-all ${
                isActive
                  ? "border-amber-500 bg-amber-50/40 dark:bg-amber-950/30 shadow-md ring-2 ring-amber-500/20"
                  : "border-stone-200 bg-white hover:border-amber-500/40 dark:border-stone-800 dark:bg-[#141a24]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="editorial-tag text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {category.name}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {count > 0 ? count : category.postCount} stories
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2">
                {category.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Tags Cloud */}
      <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
          <TagIcon className="h-3.5 w-3.5" />
          <span>All Technology &amp; Topic Tags</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = tag.slug === currentTagSlug;
            return (
              <Link
                key={tag.id}
                href={isSelected ? "/categories" : `/categories?tag=${tag.slug}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm font-bold"
                    : "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700"
                }`}
              >
                #{tag.name}
                <span className="ml-1 opacity-60">({tag.postCount})</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Filtered Posts Feed */}
      <div className="space-y-6">
        {(activeCategory || activeTag) && (
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Showing stories for:{" "}
              <span className="text-amber-600 dark:text-amber-400">
                {activeCategory ? activeCategory.name : `#${activeTag?.name}`}
              </span>
            </h2>
            <Link
              href="/categories"
              className="text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-white"
            >
              Clear filters
            </Link>
          </div>
        )}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-2">
            <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
              No stories found in this track
            </p>
            <p className="text-xs text-stone-400">
              Check back soon or explore other topics above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
