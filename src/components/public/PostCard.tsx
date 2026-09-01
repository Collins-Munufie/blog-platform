"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Heart, Bookmark, MessageCircle, Layers } from "lucide-react";
import { Post } from "@/lib/types";
import { formatDate, formatCompactNumber } from "@/lib/utils";
import { toggleLikePost } from "@/lib/api/posts";
import { useToast } from "@/components/ui/Toast";

interface PostCardProps {
  post: Post;
  variant?: "default" | "compact" | "horizontal";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [likes, setLikes] = React.useState(post.likes || 0);
  const [isLiked, setIsLiked] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("devlog_saved_bookmarks") || "[]"
      ) as string[];
      setIsBookmarked(saved.includes(post.id));

      const likedList = JSON.parse(
        localStorage.getItem("devlog_liked_posts") || "[]"
      ) as string[];
      setIsLiked(likedList.includes(post.id));
    } catch {}
  }, [post.id]);

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const likedList = JSON.parse(
        localStorage.getItem("devlog_liked_posts") || "[]"
      ) as string[];

      if (isLiked) {
        const next = likedList.filter((id) => id !== post.id);
        localStorage.setItem("devlog_liked_posts", JSON.stringify(next));
        setIsLiked(false);
        setLikes((prev) => Math.max(0, prev - 1));
      } else {
        const next = [...likedList, post.id];
        localStorage.setItem("devlog_liked_posts", JSON.stringify(next));
        setIsLiked(true);
        setLikes((prev) => prev + 1);
        toggleLikePost(post.id);
        toast({
          title: "Liked!",
          description: `You liked "${post.title}".`,
          type: "success",
        });
      }
    } catch {}
  };

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
        toast({ title: "Removed from reading list", type: "info" });
      } else {
        const next = [...saved, post.id];
        localStorage.setItem("devlog_saved_bookmarks", JSON.stringify(next));
        setIsBookmarked(true);
        toast({
          title: "Saved to Reading List",
          description: "Access this story anytime in your Saved collection.",
          type: "success",
        });
      }
    } catch {}
  };

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : "";
    const text = encodeURIComponent(`Read on khophi_the_blogger: "${post.title}"\n${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  if (variant === "horizontal") {
    return (
      <article className="group card-simple flex flex-col sm:flex-row gap-5 p-5 rounded-2xl relative">
        <Link
          href={`/blog/${post.slug}`}
          className="relative aspect-[16/10] sm:w-52 sm:aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-800"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, 220px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="flex flex-col justify-between flex-1 space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Link href={`/categories?slug=${post.category.slug}`}>
                  <span className="editorial-tag text-[11px] font-bold px-2.5 py-0.5 rounded-full hover:underline">
                    {post.category.name}
                  </span>
                </Link>
                {post.series && (
                  <span className="text-[10px] font-bold text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Layers className="h-2.5 w-2.5" /> Series
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="p-1 rounded-lg text-[#25D366] hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="h-3.5 w-3.5 fill-current" />
                </button>
                <button
                  type="button"
                  onClick={handleBookmarkToggle}
                  className={`p-1 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white ${
                    isBookmarked ? "text-[#f59e0b]" : ""
                  }`}
                  title={isBookmarked ? "Remove bookmark" : "Save for later"}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-[#f59e0b]" : ""}`} />
                </button>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 font-heading leading-snug">
                {post.title}
              </h3>
            </Link>

            <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500">
            <Link
              href={`/about`}
              className="hover:text-stone-900 dark:hover:text-white transition-colors font-medium"
            >
              {post.author.name} • {formatDate(post.publishedAt)}
            </Link>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="flex items-center gap-1" title={`${post.views || 0} reads`}>
                <Eye className="h-3.5 w-3.5 text-stone-400" /> {formatCompactNumber(post.views || 0)}
              </span>
              <button
                type="button"
                onClick={handleLikeToggle}
                className={`flex items-center gap-1 hover:scale-105 transition-transform ${
                  isLiked ? "text-rose-500 font-bold" : "text-stone-500"
                }`}
                title={isLiked ? "Liked" : "Click to like"}
              >
                <Heart className={`h-3.5 w-3.5 text-rose-500 ${isLiked ? "fill-rose-500" : ""}`} />
                <span>{formatCompactNumber(likes)}</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group card-simple flex flex-col justify-between overflow-hidden rounded-2xl relative">
      <div>
        {/* Cover Image */}
        <Link
          href={`/blog/${post.slug}`}
          className="relative aspect-[16/10] overflow-hidden block bg-stone-100 dark:bg-stone-800"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="editorial-tag text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm bg-white/90 dark:bg-stone-900/90">
              {post.category.name}
            </span>
            {post.series && (
              <span className="text-[10px] font-bold bg-stone-900/80 text-[#f59e0b] px-2 py-0.5 rounded-full backdrop-blur-sm">
                Series
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="p-1.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-[#25D366] shadow-sm backdrop-blur-sm hover:scale-105 transition-all"
              title="Share on WhatsApp"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" />
            </button>
            <button
              type="button"
              onClick={handleBookmarkToggle}
              className={`p-1.5 rounded-full bg-white/90 dark:bg-stone-900/90 shadow-sm backdrop-blur-sm transition-all hover:scale-105 ${
                isBookmarked ? "text-[#f59e0b]" : "text-stone-600 dark:text-stone-300"
              }`}
              title={isBookmarked ? "Remove bookmark" : "Save for later"}
            >
              <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-[#f59e0b]" : ""}`} />
            </button>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readingTimeMinutes} min read</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 font-heading leading-snug">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between border-t border-stone-100 pt-3 dark:border-stone-800">
          <Link
            href={`/about`}
            className="flex items-center gap-2 group/author"
          >
            <Image
              src={post.author.avatar || "/khophi_profile.jpg"}
              alt={post.author.name}
              width={24}
              height={24}
              className="rounded-full object-cover ring-1 ring-stone-300 h-6 w-6"
            />
            <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover/author:text-amber-600">
              {post.author.name}
            </span>
          </Link>

          <div className="flex items-center gap-2.5 text-xs text-stone-500 font-mono">
            <span className="flex items-center gap-1" title={`${post.views || 0} reads`}>
              <Eye className="h-3.5 w-3.5" />
              {formatCompactNumber(post.views || 0)}
            </span>
            <button
              type="button"
              onClick={handleLikeToggle}
              className={`flex items-center gap-1 hover:scale-105 transition-transform ${
                isLiked ? "text-rose-500 font-bold" : "text-stone-500"
              }`}
              title={isLiked ? "Liked" : "Click to like"}
            >
              <Heart className={`h-3.5 w-3.5 text-rose-500 ${isLiked ? "fill-rose-500" : ""}`} />
              <span>{formatCompactNumber(likes)}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
