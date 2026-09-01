"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Eye,
  Heart,
  Bookmark,
  Sparkles,
  ArrowRight,
  BookOpen,
  MessageCircle,
  Layers,
} from "lucide-react";
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
    } catch {}
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
        toast({ title: "Removed from Reading List", type: "info" });
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
    const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : "";
    const text = encodeURIComponent(`Read on khophi_the_blogger: "${post.title}"\n${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <article className="featured-panel rounded-3xl text-white shadow-2xl p-6 sm:p-8 lg:p-12 relative overflow-hidden border border-amber-400/20">
      {/* Decorative ambient radial glows */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#f59e0b]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#20509b]/40 blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Metadata, Title & Actions */}
        <div className="lg:col-span-7 space-y-5">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#f59e0b] text-[#08214e] shadow-md">
              <Sparkles className="h-3.5 w-3.5 fill-current" />
              Spotlight Story
            </span>

            {post.series && (
              <span className="glass-pill px-3 py-1 rounded-full text-xs font-bold text-amber-200 flex items-center gap-1">
                <Layers className="h-3 w-3" />
                {post.series.title}
              </span>
            )}

            <span className="glass-pill px-3 py-1 rounded-full text-xs font-semibold text-blue-100">
              {post.category.name}
            </span>

            <div className="flex items-center gap-1 text-xs text-blue-200">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          </div>

          {/* Heading */}
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white hover:text-[#f59e0b] transition-colors leading-[1.15] font-heading">
              {post.title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p className="text-sm sm:text-base text-blue-100/90 line-clamp-3 leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap items-center gap-4 py-1 text-xs text-blue-200">
            <div className="flex items-center gap-1.5 font-medium">
              <Eye className="h-4 w-4 text-[#f59e0b]" />
              <span className="font-bold text-white">{formatCompactNumber(post.views)}</span> Reads
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
              <span className="font-bold text-white">{formatCompactNumber(post.likes)}</span> Reactions
            </div>
            <span className="text-amber-300 font-semibold font-mono">🇬🇭 Accra, Ghana</span>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-[#08214e] hover:bg-[#fff9eb] text-xs font-extrabold shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <BookOpen className="h-4 w-4 text-[#08214e]" />
              <span>Read Full Article</span>
              <ArrowRight className="h-4 w-4 text-[#08214e]" />
            </Link>

            {/* WhatsApp Share Button */}
            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-[#25D366] text-slate-950 hover:bg-[#20bd5a] shadow-md transition-all"
              title="Share on WhatsApp"
            >
              <MessageCircle className="h-4 w-4 fill-slate-950" />
              <span>Share on WhatsApp</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={handleBookmarkToggle}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold glass-pill hover:bg-white/20 transition-all ${
                isBookmarked ? "text-[#f59e0b] border-[#f59e0b]" : "text-white"
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              <span>{isBookmarked ? "Saved" : "Save"}</span>
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

          {/* Author Badge */}
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
                className="rounded-full object-cover ring-2 ring-[#f59e0b]"
              />
              <div>
                <p className="font-bold text-white">{post.author.name}</p>
                <p className="text-[10px] text-blue-200">@{post.author.handle} • {post.author.role}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#f59e0b] bg-[#041536]/70 px-2 py-0.5 rounded-full">
              Khophi
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
