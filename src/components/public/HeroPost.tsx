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
  Layers,
  MapPin,
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
    const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : "";
    const text = encodeURIComponent(`Read on khophi_the_blogger: "${post.title}"\n${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <article className="featured-editorial rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-xl border border-stone-800">
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Metadata, Title & Actions */}
        <div className="lg:col-span-7 space-y-5">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f59e0b] text-[#0f172a] shadow-sm">
              Featured Essay
            </span>

            {post.series && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-amber-200 border border-white/15 flex items-center gap-1">
                <Layers className="h-3 w-3" />
                {post.series.title}
              </span>
            )}

            <span className="px-3 py-1 rounded-full text-xs font-medium text-stone-300 bg-white/5 border border-white/10">
              {post.category.name}
            </span>

            <div className="flex items-center gap-1 text-xs text-stone-300">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
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

          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-4 py-1 text-xs text-stone-300 font-medium">
            <div className="flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-[#f59e0b]" />
              <span className="font-bold text-white">{formatCompactNumber(post.views)}</span> Reads
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
              <span className="font-bold text-white">{formatCompactNumber(post.likes)}</span> Likes
            </div>
            <span className="text-amber-300 font-semibold font-mono">📍 Osu, Accra</span>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <BookOpen className="h-4 w-4 text-stone-900" />
              <span>Read Essay</span>
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

        {/* Right Column: Hero Cover Photo & Author Card */}
        <div className="lg:col-span-5 relative">
          <Link
            href={`/blog/${post.slug}`}
            className="block relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-stone-700 group"
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 440px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* Author Badge */}
          <Link
            href={`/author/${post.author.id}`}
            className="absolute -bottom-3 left-4 right-4 bg-stone-900/90 backdrop-blur-md p-3 rounded-xl flex items-center justify-between gap-3 text-xs border border-stone-700 hover:bg-stone-800 transition-all shadow-lg"
          >
            <div className="flex items-center gap-2.5">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full object-cover ring-1 ring-[#f59e0b]"
              />
              <div>
                <p className="font-bold text-white leading-tight">{post.author.name}</p>
                <p className="text-[10px] text-stone-400">Written from {post.author.location || "Accra, Ghana"}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#f59e0b] bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
              Author
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
