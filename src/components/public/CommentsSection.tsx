"use client";

import * as React from "react";
import Image from "next/image";
import { MessageSquare, Heart, CornerDownRight, Send } from "lucide-react";
import { Comment } from "@/lib/types";
import { addComment, likeComment } from "@/lib/api/comments";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

interface CommentsSectionProps {
  postId: string;
  initialComments: Comment[];
}

export function CommentsSection({
  postId,
  initialComments,
}: CommentsSectionProps) {
  const [comments, setComments] = React.useState<Comment[]>(initialComments);
  const [name, setName] = React.useState("");
  const [content, setContent] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [replyingToId, setReplyingToId] = React.useState<string | null>(null);
  const [replyContent, setReplyContent] = React.useState("");

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const newComment = await addComment({
        postId,
        name: name.trim() || "Engineering Reader",
        content: content.trim(),
      });
      setComments((prev) => [newComment, ...prev]);
      setContent("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = async (parentId: string) => {
    if (!replyContent.trim()) return;

    const newReply = await addComment({
      postId,
      name: name.trim() || "Engineering Reader",
      content: replyContent.trim(),
      replyToId: parentId,
    });

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [...(c.replies || []), newReply],
          };
        }
        return c;
      })
    );

    setReplyingToId(null);
    setReplyContent("");
  };

  const handleLike = async (commentId: string) => {
    await likeComment(commentId);
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return { ...c, likes: c.likes + 1 };
        }
        if (c.replies) {
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === commentId ? { ...r, likes: r.likes + 1 } : r
            ),
          };
        }
        return c;
      })
    );
  };

  return (
    <section id="comments-section" className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Discussion ({comments.length})
        </h3>
      </div>

      {/* Write a comment form */}
      <form
        onSubmit={handleSubmitComment}
        className="mb-10 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Your name or handle (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        <textarea
          required
          rows={3}
          placeholder="What are your thoughts on this architecture or approach?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />
        <div className="flex justify-end">
          <Button type="submit" isLoading={submitting} size="sm" className="gap-1.5 rounded-xl">
            <Send className="h-3.5 w-3.5" />
            Post Comment
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">
            No comments yet. Start the engineering conversation!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-5 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/40 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover bg-slate-100"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {comment.author.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-500 dark:text-slate-400 transition-colors"
                >
                  <Heart className="h-3.5 w-3.5" />
                  <span>{comment.likes}</span>
                </button>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-1">
                {comment.content}
              </p>

              {/* Reply trigger */}
              <div className="flex items-center gap-4 pt-1">
                <button
                  onClick={() =>
                    setReplyingToId(
                      replyingToId === comment.id ? null : comment.id
                    )
                  }
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                  <CornerDownRight className="h-3 w-3" />
                  Reply
                </button>
              </div>

              {/* Reply Form */}
              {replyingToId === comment.id && (
                <div className="mt-3 pl-4 border-l-2 border-primary-400/50 space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingToId(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleReplySubmit(comment.id)}
                    >
                      Submit Reply
                    </Button>
                  </div>
                </div>
              )}

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                          />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">
                            {reply.author.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            • {formatDate(reply.createdAt)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleLike(reply.id)}
                          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-red-500"
                        >
                          <Heart className="h-3 w-3" />
                          <span>{reply.likes}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 pl-8 leading-relaxed">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
