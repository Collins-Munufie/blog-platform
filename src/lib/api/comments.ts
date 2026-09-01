import { Comment } from "../types";
import { MOCK_COMMENTS } from "../mock-data";

const STORAGE_KEY = "devlog_comments_store";

function getStoredComments(): Comment[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore
    }
  }
  return [...MOCK_COMMENTS];
}

function saveStoredComments(comments: Comment[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    } catch {
      // Ignore
    }
  }
}

let commentsState: Comment[] = [...MOCK_COMMENTS];

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  await new Promise((resolve) => setTimeout(resolve, 20));
  if (typeof window !== "undefined") {
    commentsState = getStoredComments();
  }
  return commentsState.filter((c) => c.postId === postId);
}

export async function addComment(params: {
  postId: string;
  name: string;
  content: string;
  replyToId?: string;
}): Promise<Comment> {
  await new Promise((resolve) => setTimeout(resolve, 40));

  if (typeof window !== "undefined") {
    commentsState = getStoredComments();
  }

  const newComment: Comment = {
    id: `comm-${Date.now()}`,
    postId: params.postId,
    author: {
      name: params.name || "Engineering Reader",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(params.name || "reader")}`,
    },
    content: params.content,
    createdAt: new Date().toISOString(),
    likes: 0,
  };

  if (params.replyToId) {
    const parent = commentsState.find((c) => c.id === params.replyToId);
    if (parent) {
      parent.replies = parent.replies || [];
      parent.replies.push(newComment);
      saveStoredComments(commentsState);
      return newComment;
    }
  }

  commentsState.unshift(newComment);
  saveStoredComments(commentsState);
  return newComment;
}

export async function likeComment(commentId: string): Promise<number> {
  if (typeof window !== "undefined") {
    commentsState = getStoredComments();
  }

  const findAndLike = (list: Comment[]): number | null => {
    for (const c of list) {
      if (c.id === commentId) {
        c.likes += 1;
        return c.likes;
      }
      if (c.replies && c.replies.length > 0) {
        const res = findAndLike(c.replies);
        if (res !== null) return res;
      }
    }
    return null;
  };

  const count = findAndLike(commentsState);
  saveStoredComments(commentsState);
  return count || 0;
}
