"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Heart, Bookmark, Sparkles } from "lucide-react";
import { Post } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatCompactNumber } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export function HeroPost({ post }: { post: Post }) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("devlog_saved_bookmarks") || "[]"
      ) as string[];
      setIsBookmarked(saved.includes(post.id));
    } catch {
      // Ignore
    }
  }, [post.id]);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const saved = JSON.parse(
        localStorage.getItem("devlog_saved_bookmarks") || "[]"
      ) as string[];

      if (isBookmarked) {
        const next = saved.filter((id) => id !== post.id);
        localStorage.setItem("devlog_saved_bookmarks", JSON.stringify(next));
        setIsBookmarked(false);
        toast({
          title: "Removed from Reading List",
          type: "info",
        });
      } else {
        const next = [...saved, post.id];
        localStorage.setItem("devlog_saved_bookmarks", JSON.stringify(next));
        setIsBookmarked(true);
        toast({
          title: "Saved to Reading List",
          description: "Access this article anytime in your Saved List.",
          type: "success",
        });
      }
    } catch {
      // Ignore
    }
  };

  return (
    <article className="group card-simple card-hover overflow-hidden relative shadow-card">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center">
        {/* Cover Image Container */}
        <Link
          href={`/blog/${post.slug}`}
          className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[380px] lg:col-span-7 overflow-hidden block bg-slate-100 dark:bg-slate-800"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-700/90 text-white backdrop-blur-md shadow-md">
              <Sparkles className="h-3 w-3" /> Featured Deep-Dive
            </span>
          </div>
        </Link>

        {/* Post Metadata & Content */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Link href={`/categories?slug=${post.category.slug}`}>
                <Badge variant="indigo" size="md">
                  {post.category.name}
                </Badge>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTimeMinutes} min read</span>
                </div>
                <button
                  onClick={handleBookmarkToggle}
                  className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ${
                    isBookmarked ? "text-blue-600 dark:text-blue-400" : ""
                  }`}
                  title={isBookmarked ? "Remove bookmark" : "Save for later"}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight font-heading">
                {post.title}
              </h2>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Author & Footer Info */}
          <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Link
              href={`/author/${post.author.id}`}
              className="flex items-center gap-3 group/author"
            >
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
              />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white group-hover/author:text-blue-600 transition-colors">
                  {post.author.name}
                </p>
                <p className="text-xs text-slate-400">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {formatCompactNumber(post.views)}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-rose-500" />
                {formatCompactNumber(post.likes)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
