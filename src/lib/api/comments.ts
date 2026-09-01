import { Comment } from "../types";
import { MOCK_COMMENTS } from "../mock-data";

let commentsState: Comment[] = [...MOCK_COMMENTS];

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  await new Promise((resolve) => setTimeout(resolve, 20));
  return commentsState.filter((c) => c.postId === postId);
}

export async function addComment(params: {
  postId: string;
  name: string;
  content: string;
  replyToId?: string;
}): Promise<Comment> {
  await new Promise((resolve) => setTimeout(resolve, 60));

  const newComment: Comment = {
    id: `comm-${Date.now()}`,
    postId: params.postId,
    author: {
      name: params.name || "Anonymous Reader",
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
      return newComment;
    }
  }

  commentsState.unshift(newComment);
  return newComment;
}

export async function likeComment(commentId: string): Promise<number> {
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
  return count || 0;
}
