"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Heart, Bookmark } from "lucide-react";
import { Post } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatCompactNumber } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

interface PostCardProps {
  post: Post;
  variant?: "default" | "compact" | "horizontal";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
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
    e.stopPropagation();

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

  if (variant === "horizontal") {
    return (
      <article className="group card-simple card-hover flex flex-col sm:flex-row gap-5 p-4 sm:p-5 relative">
        <Link
          href={`/blog/${post.slug}`}
          className="relative aspect-[16/10] sm:w-52 sm:aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, 220px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="flex flex-col justify-between flex-1 space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Link href={`/categories?slug=${post.category.slug}`}>
                <Badge variant="indigo" size="sm">
                  {post.category.name}
                </Badge>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">
                  {post.readingTimeMinutes} min read
                </span>
                <button
                  onClick={handleBookmarkToggle}
                  className={`p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ${
                    isBookmarked ? "text-blue-600 dark:text-blue-400" : ""
                  }`}
                  title={isBookmarked ? "Remove bookmark" : "Save for later"}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>

            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-400">
            <Link
              href={`/author/${post.author.id}`}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {post.author.name} • {formatDate(post.publishedAt)}
            </Link>
            <div className="flex items-center gap-2.5 font-mono">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {formatCompactNumber(post.views)}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-rose-500" /> {formatCompactNumber(post.likes)}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group card-simple card-hover flex flex-col justify-between overflow-hidden relative">
      <div>
        {/* Cover Image */}
        <Link
          href={`/blog/${post.slug}`}
          className="relative aspect-[16/10] overflow-hidden block bg-slate-100 dark:bg-slate-800"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="indigo" size="sm">
              {post.category.name}
            </Badge>
          </div>
          <button
            onClick={handleBookmarkToggle}
            className={`absolute top-3 right-3 p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-sm backdrop-blur-sm transition-all hover:scale-105 ${
              isBookmarked
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-600 dark:text-slate-300"
            }`}
            title={isBookmarked ? "Remove bookmark" : "Save for later"}
          >
            <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
          </button>
        </Link>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readingTimeMinutes} min read</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <Link
            href={`/author/${post.author.id}`}
            className="flex items-center gap-2 group/author"
          >
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={26}
              height={26}
              className="rounded-full object-cover"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover/author:text-blue-600">
              {post.author.name}
            </span>
          </Link>

          <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatCompactNumber(post.views)}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-rose-500" />
              {formatCompactNumber(post.likes)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
