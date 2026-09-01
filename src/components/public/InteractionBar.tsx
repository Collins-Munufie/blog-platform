"use client";

import * as React from "react";
import { Heart, Bookmark, MessageSquare, Share2, Check, Twitter, Linkedin } from "lucide-react";
import { toggleLikePost } from "@/lib/api/posts";
import { formatCompactNumber } from "@/lib/utils";

interface InteractionBarProps {
  postId: string;
  initialLikes: number;
  initialBookmarks?: number;
  commentsCount: number;
}

export function InteractionBar({
  postId,
  initialLikes,
  initialBookmarks = 0,
  commentsCount,
}: InteractionBarProps) {
  const [likes, setLikes] = React.useState(initialLikes);
  const [hasLiked, setHasLiked] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState(initialBookmarks);
  const [copied, setCopied] = React.useState(false);

  const handleLike = async () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      await toggleLikePost(postId);
    }
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      setBookmarks((prev) => prev - 1);
      setIsBookmarked(false);
    } else {
      setBookmarks((prev) => prev + 1);
      setIsBookmarked(true);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToComments = () => {
    document.getElementById("comments-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center justify-between py-4 border-y border-slate-200 dark:border-slate-800 my-8">
      {/* Left Reactions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Like / Clap button */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
            hasLiked
              ? "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-800"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
          aria-label="Like post"
        >
          <Heart
            className={`h-4 w-4 transition-transform ${
              hasLiked ? "fill-red-500 text-red-500 scale-110" : ""
            }`}
          />
          <span>{formatCompactNumber(likes)}</span>
        </button>

        {/* Comment count jump */}
        <button
          onClick={scrollToComments}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
          aria-label="Jump to comments"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{commentsCount}</span>
        </button>
      </div>

      {/* Right Tools (Bookmark & Share) */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-full transition-colors ${
            isBookmarked
              ? "bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          }`}
          title="Bookmark article"
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
          title="Share article link"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
