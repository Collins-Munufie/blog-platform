"use client";

import * as React from "react";
import {
  Heart,
  Flame,
  Sparkles,
  Bookmark,
  Share2,
  Check,
  MessageSquare,
  MessageCircle,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCompactNumber } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

interface InteractionBarProps {
  postId: string;
  title: string;
  initialLikes?: number;
  initialBookmarks?: number;
  commentsCount?: number;
}

export function InteractionBar({
  postId,
  title,
  initialLikes = 0,
  commentsCount = 0,
}: InteractionBarProps) {
  const [reactions, setReactions] = React.useState({
    love: initialLikes || 140,
    fire: 85,
    clap: 62,
    insightful: 44,
  });
  const [userReactions, setUserReactions] = React.useState<Record<string, boolean>>({});
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    try {
      const savedUserReactions = JSON.parse(
        localStorage.getItem(`devlog_user_reactions_${postId}`) || "{}"
      );
      setUserReactions(savedUserReactions);

      const savedBookmarks = JSON.parse(
        localStorage.getItem("devlog_saved_bookmarks") || "[]"
      ) as string[];
      setIsBookmarked(savedBookmarks.includes(postId));
    } catch {}
  }, [postId]);

  const toggleReaction = (type: "love" | "fire" | "clap" | "insightful", label: string) => {
    const hasReacted = userReactions[type];
    const nextReactions = { ...reactions, [type]: reactions[type] + (hasReacted ? -1 : 1) };
    const nextUser = { ...userReactions, [type]: !hasReacted };

    setReactions(nextReactions);
    setUserReactions(nextUser);
    localStorage.setItem(`devlog_user_reactions_${postId}`, JSON.stringify(nextUser));

    if (!hasReacted) {
      toast({
        title: `Reacted with ${label}!`,
        description: "Your reaction has been recorded on this post.",
        type: "success",
      });
    }
  };

  const toggleBookmark = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("devlog_saved_bookmarks") || "[]"
      ) as string[];
      if (isBookmarked) {
        const next = saved.filter((id) => id !== postId);
        localStorage.setItem("devlog_saved_bookmarks", JSON.stringify(next));
        setIsBookmarked(false);
        toast({ title: "Removed from reading list", type: "info" });
      } else {
        const next = [...saved, postId];
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

  const getShareUrl = () => {
    return typeof window !== "undefined" ? window.location.href : "";
  };

  const handleWhatsAppShare = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(`Read on khophi_the_blogger: "${title}"\n${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleTwitterShare = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(`"${title}" via @khophi_the_blogger`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, "_blank");
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({ title: "Link copied to clipboard!", type: "success" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-4 border-y border-[#e2e8f2] dark:border-[#1e3a6a] flex flex-wrap items-center justify-between gap-4">
      {/* Multi-Reactions Suite */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => toggleReaction("love", "❤️ Love")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            userReactions.love
              ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-bold ring-1 ring-rose-400"
              : "bg-[#f7f9fc] hover:bg-rose-50 text-[#2f3b4d] dark:bg-[#12346e]/40 dark:text-slate-200"
          }`}
        >
          <Heart className={`h-4 w-4 ${userReactions.love ? "fill-rose-500 text-rose-500" : "text-rose-500"}`} />
          <span>{formatCompactNumber(reactions.love)}</span>
        </button>

        <button
          onClick={() => toggleReaction("fire", "🔥 Fire")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            userReactions.fire
              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold ring-1 ring-amber-400"
              : "bg-[#f7f9fc] hover:bg-amber-50 text-[#2f3b4d] dark:bg-[#12346e]/40 dark:text-slate-200"
          }`}
        >
          <Flame className={`h-4 w-4 ${userReactions.fire ? "fill-amber-500 text-amber-500" : "text-amber-500"}`} />
          <span>{formatCompactNumber(reactions.fire)}</span>
        </button>

        <button
          onClick={() => toggleReaction("clap", "👏 Clap")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            userReactions.clap
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold ring-1 ring-emerald-400"
              : "bg-[#f7f9fc] hover:bg-emerald-50 text-[#2f3b4d] dark:bg-[#12346e]/40 dark:text-slate-200"
          }`}
        >
          <span>👏</span>
          <span>{formatCompactNumber(reactions.clap)}</span>
        </button>

        <button
          onClick={() => toggleReaction("insightful", "💡 Insightful")}
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            userReactions.insightful
              ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-bold ring-1 ring-blue-400"
              : "bg-[#f7f9fc] hover:bg-blue-50 text-[#2f3b4d] dark:bg-[#12346e]/40 dark:text-slate-200"
          }`}
        >
          <span>💡</span>
          <span>{formatCompactNumber(reactions.insightful)}</span>
        </button>
      </div>

      {/* Social Sharing (WhatsApp prioritized for Ghana) & Bookmark */}
      <div className="flex items-center gap-2">
        {/* WhatsApp 1-Click Share Button */}
        <button
          onClick={handleWhatsAppShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#25D366]/15 text-[#128C7E] hover:bg-[#25D366]/25 dark:bg-[#25D366]/20 dark:text-[#25D366] transition-colors border border-[#25D366]/30"
          title="Share via WhatsApp"
        >
          <MessageCircle className="h-4 w-4 fill-current" />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>

        {/* Twitter/X Share */}
        <button
          onClick={handleTwitterShare}
          className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          title="Share on X (Twitter)"
        >
          <Twitter className="h-4 w-4" />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          title="Copy Link"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
        </button>

        {/* Bookmark */}
        <button
          onClick={toggleBookmark}
          className={`p-2 rounded-full transition-colors ${
            isBookmarked
              ? "text-[#f59e0b] bg-amber-50 dark:bg-amber-950/40"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white"
          }`}
          title={isBookmarked ? "Remove Bookmark" : "Save Story"}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-[#f59e0b]" : ""}`} />
        </button>
      </div>
    </div>
  );
}
