"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Eye,
  Heart,
  Bookmark,
  ArrowRight,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { Post } from "@/lib/types";
import { formatDate, formatCompactNumber } from "@/lib/utils";
import { toggleLikePost } from "@/lib/api/posts";
import { useToast } from "@/components/ui/Toast";

export function HeroPost({ post }: { post: Post }) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [likes, setLikes] = React.useState(post.likes || 0);
  const [views, setViews] = React.useState(post.views || 0);
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

    // Real-time synchronization listeners
    const handleLikesSync = (e: any) => {
      if (e.detail?.id === post.id) {
        setLikes(e.detail.likes);
      }
    };

    const handleViewsSync = (e: any) => {
      if (e.detail?.id === post.id) {
        setViews(e.detail.views);
      }
    };

    window.addEventListener("likes_updated", handleLikesSync);
    window.addEventListener("views_updated", handleViewsSync);

    return () => {
      window.removeEventListener("likes_updated", handleLikesSync);
      window.removeEventListener("views_updated", handleViewsSync);
    };
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
        window.dispatchEvent(new Event("bookmarks_updated"));
        toast({ title: "Removed from reading list", type: "info" });
      } else {
        const next = [...saved, post.id];
        localStorage.setItem("devlog_saved_bookmarks", JSON.stringify(next));
        setIsBookmarked(true);
        window.dispatchEvent(new Event("bookmarks_updated"));
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

  return (
    <article className="relative overflow-hidden rounded-3xl bg-[#08214e] text-white shadow-2xl border border-amber-400/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 lg:p-10 items-center">
        {/* Left Column: Headline & Metadata */}
        <div className="lg:col-span-7 space-y-4">
          {/* Tag, Category & Read Time */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f59e0b] text-[#08214e] shadow-sm">
              Featured Story
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-sm">
              {post.category.name}
            </span>
            <span className="text-xs text-stone-300 font-mono flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTimeMinutes} min read
            </span>
          </div>

          {/* Title */}
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white hover:text-[#f59e0b] transition-colors leading-[1.2] font-heading">
              {post.title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p className="text-sm sm:text-base text-stone-300 line-clamp-3 leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>

          {/* Real-time interactive metadata chips */}
          <div className="flex flex-wrap items-center gap-4 py-1 text-xs text-stone-300 font-medium">
            <div className="flex items-center gap-1.5" title="Real-time readers count">
              <Eye className="h-4 w-4 text-[#f59e0b]" />
              <span className="font-bold text-white font-mono">{formatCompactNumber(views)}</span> Reads
            </div>

            {/* Clickable Like Button */}
            <button
              onClick={handleLikeToggle}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                isLiked
                  ? "bg-rose-500/20 text-rose-300 border border-rose-400/40 scale-105"
                  : "bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white"
              }`}
              title={isLiked ? "Unlike story" : "Like story (Real-time)"}
            >
              <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-rose-400 text-rose-400" : ""}`} />
              <span className="font-mono">{formatCompactNumber(likes)}</span>
            </button>

            <span className="text-amber-300 font-semibold font-mono">📍 Accra, Ghana</span>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <BookOpen className="h-4 w-4 text-stone-900" />
              <span>Read Story</span>
              <ArrowRight className="h-4 w-4 text-stone-900" />
            </Link>

            {/* WhatsApp Share Button */}
            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#25D366] text-stone-950 hover:bg-[#20bd5a] shadow-sm transition-all"
              title="Share on WhatsApp"
            >
              <MessageCircle className="h-4 w-4 fill-stone-950" />
              <span>Share on WhatsApp</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={handleBookmarkToggle}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 transition-all ${
                isBookmarked ? "text-[#f59e0b] border border-[#f59e0b]" : "text-white"
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              <span>{isBookmarked ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Cover Photo (Unclipped, Crisp, Zero Overlap) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <Link
            href={`/blog/${post.slug}`}
            className="block relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-stone-700/80 group bg-stone-950/90 p-2.5"
          >
            {/* Ambient subtle blur so badges/square assets blend seamlessly */}
            <div className="absolute inset-0 overflow-hidden opacity-25 blur-xl scale-110 pointer-events-none">
              <Image
                src={post.coverImage}
                alt=""
                fill
                className="object-cover"
              />
            </div>

            {/* Crisp unclipped main image */}
            <div className="relative h-full w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Author Badge cleanly positioned below the image frame (NO OVERLAP) */}
          <Link
            href={`/about`}
            className="mt-3.5 bg-stone-900/90 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between gap-3 text-xs border border-stone-800 hover:bg-stone-800 transition-all shadow-md group"
          >
            <div className="flex items-center gap-2.5">
              <Image
                src={post.author.avatar || "/khophi_profile.jpg"}
                alt={post.author.name}
                width={34}
                height={34}
                className="rounded-full object-cover ring-1 ring-[#f59e0b] h-8 w-8"
              />
              <div>
                <p className="font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">{post.author.name}</p>
                <p className="text-[10px] text-stone-400">Written from {post.author.location || "Accra, Ghana"}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#f59e0b] bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              Author
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
