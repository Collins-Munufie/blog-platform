"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, ArrowRight, BookOpen } from "lucide-react";
import { Post } from "@/lib/types";
import { getPosts } from "@/lib/api/posts";
import { PostCard } from "@/components/public/PostCard";
import { Button } from "@/components/ui/Button";

export default function BookmarksPage() {
  const [bookmarkedPosts, setBookmarkedPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const savedIds = JSON.parse(
          localStorage.getItem("devlog_saved_bookmarks") || "[]"
        ) as string[];

        const all = await getPosts({ status: "all" });
        if (savedIds.length > 0) {
          setBookmarkedPosts(all.filter((p) => savedIds.includes(p.id)));
        } else {
          // If no bookmarks yet, show first 2 as sample suggestion
          setBookmarkedPosts([]);
        }
      } catch {
        setBookmarkedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800 text-xs font-semibold text-primary-700 dark:text-primary-300">
          <Bookmark className="h-3.5 w-3.5" />
          <span>Your Reading List</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Saved Articles & Bookmarks
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Access your curated reading list anytime. Bookmarks are saved directly to your browser.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-sm text-slate-400">
          Loading your bookmarks...
        </div>
      ) : bookmarkedPosts.length === 0 ? (
        <div className="py-16 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8 space-y-4 max-w-md mx-auto">
          <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No saved articles yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click the bookmark icon on any article to save it for offline or later reading.
          </p>
          <Link href="/">
            <Button size="sm" className="gap-1.5 rounded-xl mt-2">
              Explore Articles <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
