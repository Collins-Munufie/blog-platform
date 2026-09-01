"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Heart, Bookmark, ArrowRight } from "lucide-react";
import { Post } from "@/lib/types";
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
          description: "Access this article anytime in your Saved Stories.",
          type: "success",
        });
      }
    } catch {
      // Ignore
    }
  };

  if (variant === "horizontal") {
    return (
      <article className="group card-lift flex flex-col sm:flex-row gap-5 p-5 rounded-2xl relative">
        <Link
          href={`/blog/${post.slug}`}
          className="relative aspect-[16/10] sm:w-56 sm:aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="flex flex-col justify-between flex-1 space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Link href={`/categories?slug=${post.category.slug}`}>
                <span className="brand-tag-gold text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {post.category.name}
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#93a0b4]">
                  {post.readingTimeMinutes} min read
                </span>
                <button
                  onClick={handleBookmarkToggle}
                  className={`p-1.5 rounded-lg text-slate-400 hover:text-[#08214e] dark:hover:text-white transition-colors ${
                    isBookmarked ? "text-[#f4ae17]" : ""
                  }`}
                  title={isBookmarked ? "Remove bookmark" : "Save for later"}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-[#f4ae17]" : ""}`} />
                </button>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-base font-bold text-[#08214e] dark:text-white group-hover:text-[#20509b] dark:group-hover:text-[#6394d6] transition-colors line-clamp-2 font-heading">
                {post.title}
              </h3>
            </Link>

            <p className="text-xs text-[#2f3b4d] dark:text-slate-300 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#e2e8f2] dark:border-[#1e3a6a] text-xs text-[#93a0b4]">
            <Link
              href={`/author/${post.author.id}`}
              className="hover:text-[#08214e] dark:hover:text-white transition-colors font-medium"
            >
              {post.author.name} • {formatDate(post.publishedAt)}
            </Link>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 text-[#20509b]" /> {formatCompactNumber(post.views)}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-rose-500" /> {formatCompactNumber(post.likes)}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group card-lift flex flex-col justify-between overflow-hidden rounded-2xl relative">
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
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="brand-tag-gold text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              {post.category.name}
            </span>
          </div>
          <button
            onClick={handleBookmarkToggle}
            className={`absolute top-3 right-3 p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-sm backdrop-blur-sm transition-all hover:scale-105 ${
              isBookmarked ? "text-[#f4ae17]" : "text-slate-600 dark:text-slate-300"
            }`}
            title={isBookmarked ? "Remove bookmark" : "Save for later"}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-[#f4ae17]" : ""}`} />
          </button>
        </Link>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#93a0b4]">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readingTimeMinutes} min read</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-[#08214e] dark:text-white group-hover:text-[#20509b] dark:group-hover:text-[#6394d6] transition-colors line-clamp-2 font-heading">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-[#2f3b4d] dark:text-slate-300 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between border-t border-[#e2e8f2] pt-3 dark:border-[#1e3a6a]">
          <Link
            href={`/author/${post.author.id}`}
            className="flex items-center gap-2 group/author"
          >
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={26}
              height={26}
              className="rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="text-xs font-semibold text-[#08214e] dark:text-slate-200 group-hover/author:text-[#20509b]">
              {post.author.name}
            </span>
          </Link>

          <div className="flex items-center gap-2.5 text-xs text-[#93a0b4] font-mono">
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5 text-[#20509b]" />
              {formatCompactNumber(post.views)}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5 text-rose-500" />
              {formatCompactNumber(post.likes)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
