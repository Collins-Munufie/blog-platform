"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Heart, Bookmark, Sparkles, ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { Post } from "@/lib/types";
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
          description: "Access this article anytime in your Saved Stories.",
          type: "success",
        });
      }
    } catch {
      // Ignore
    }
  };

  return (
    <article className="featured-panel rounded-3xl text-white shadow-2xl p-6 sm:p-8 lg:p-12 relative overflow-hidden border border-blue-400/20">
      {/* Decorative ambient radial glows */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#f4ae17]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#3d76c6]/30 blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Metadata, Title & Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Category & Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#f4ae17] text-[#041536] shadow-md shadow-amber-500/20">
              <Sparkles className="h-3.5 w-3.5 fill-[#041536]" />
              Deep-Dive of the Week
            </span>

            <span className="glass-pill px-3 py-1 rounded-full text-xs font-semibold text-blue-100">
              {post.category.name}
            </span>

            <div className="flex items-center gap-1.5 text-xs text-blue-200">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          </div>

          {/* Heading */}
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white hover:text-[#fdc035] transition-colors leading-[1.15] font-heading">
              {post.title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p className="text-sm sm:text-base text-blue-100/90 line-clamp-3 leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>

          {/* Metrics Chips inspired by dummyegator stats */}
          <div className="flex flex-wrap items-center gap-4 py-2 text-xs text-blue-200">
            <div className="flex items-center gap-1.5 font-medium">
              <Eye className="h-4 w-4 text-[#fdc035]" />
              <span className="font-bold text-white">{formatCompactNumber(post.views)}</span> Reads
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
              <span className="font-bold text-white">{formatCompactNumber(post.likes)}</span> Reactions
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Peer-Reviewed</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-[#08214e] hover:bg-[#fff9eb] text-sm font-bold shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <BookOpen className="h-4 w-4 text-[#20509b]" />
              <span>Read Full Deep-Dive</span>
              <ArrowRight className="h-4 w-4 text-[#20509b]" />
            </Link>

            <button
              onClick={handleBookmarkToggle}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold glass-pill hover:bg-white/20 transition-all ${
                isBookmarked ? "text-[#fdc035] border-[#fdc035]/60" : "text-white"
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              <span>{isBookmarked ? "Saved in List" : "Save for Later"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Cover Image & Author Card */}
        <div className="lg:col-span-5 relative">
          <Link
            href={`/blog/${post.slug}`}
            className="block relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group"
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041536]/80 via-transparent to-transparent" />
          </Link>

          {/* Floating Author Pill */}
          <Link
            href={`/author/${post.author.id}`}
            className="absolute -bottom-4 left-4 right-4 sm:left-6 sm:right-6 glass-pill p-3 rounded-xl flex items-center justify-between gap-3 text-xs hover:bg-white/25 transition-all"
          >
            <div className="flex items-center gap-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={36}
                height={36}
                className="rounded-full object-cover ring-2 ring-[#fdc035]"
              />
              <div>
                <p className="font-bold text-white">{post.author.name}</p>
                <p className="text-[10px] text-blue-200">{post.author.role}</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-[#fdc035] bg-[#041536]/60 px-2 py-0.5 rounded-full">
              Author
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
