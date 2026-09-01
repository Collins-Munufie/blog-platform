"use client";

import * as React from "react";
import { Post } from "@/lib/types";
import { getPosts } from "@/lib/api/posts";
import { PostCard } from "@/components/public/PostCard";
import { HeroPost } from "@/components/public/HeroPost";
import { Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface LivePostGridProps {
  initialPosts: Post[];
  initialFeatured?: Post | null;
}

export function LivePostGrid({ initialPosts, initialFeatured }: LivePostGridProps) {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);

  React.useEffect(() => {
    // Sync latest posts from client store / localStorage immediately on mount
    const syncPosts = async () => {
      try {
        const latest = await getPosts({ status: "published" });
        if (latest && latest.length > 0) {
          setPosts(latest);
        }
      } catch {}
    };

    syncPosts();

    // Listen for real-time post creation / updates
    window.addEventListener("posts_updated", syncPosts);
    window.addEventListener("storage", syncPosts);

    return () => {
      window.removeEventListener("posts_updated", syncPosts);
      window.removeEventListener("storage", syncPosts);
    };
  }, []);

  const leadEssay = posts.find((p) => p.featured) || posts[0];
  const otherEssays = posts.filter((p) => p.id !== leadEssay?.id);

  if (posts.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-2">
        <p className="font-bold text-base text-stone-800 dark:text-stone-200">No published stories yet</p>
        <p className="text-xs text-stone-500">Publish your first article from the Creator Studio.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* 1. Lead Featured Story */}
      {leadEssay && (
        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <Sparkles className="h-3.5 w-3.5" /> Featured Story
            </span>
            <span>{formatDate(leadEssay.publishedAt)}</span>
          </div>
          <HeroPost post={leadEssay} />
        </section>
      )}

      {/* 2. Recent Stories Grid */}
      {otherEssays.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-heading">
                Recent Stories &amp; Essays
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Investigative pieces on West African tech, music, and culture
              </p>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              {posts.length} Stories Published
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherEssays.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
