import { Post, CreatePostInput, PostStatus } from "../types";
import { MOCK_POSTS, MOCK_CATEGORIES, MOCK_TAGS, MOCK_AUTHORS } from "../mock-data";
import { calculateReadingTime, slugify } from "../utils";

const STORAGE_KEY = "devlog_posts_store";
const DEFAULT_COVER = "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80";

export function resolveCoverImage(coverImage?: string, content?: string): string {
  // If the author uploaded an image inside the content, prioritize their uploaded image
  if (content) {
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    if (match && match[1] && (!coverImage || coverImage === DEFAULT_COVER || coverImage.includes("photo-1526374965328-7f61d4dc18c5"))) {
      return match[1];
    }
  }
  if (!coverImage || coverImage.includes("photo-1526374965328-7f61d4dc18c5")) {
    return DEFAULT_COVER;
  }
  return coverImage;
}

declare global {
  var __GLOBAL_POSTS__: Post[] | undefined;
}

function getInitialPosts(): Post[] {
  return MOCK_POSTS.map((p) => ({
    ...p,
    coverImage: resolveCoverImage(p.coverImage, p.content),
  }));
}

function getStoredPosts(): Post[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Post[];
        const clean = parsed.filter((p) => !["post-1", "post-2", "post-3", "post-4", "post-5"].includes(p.id));
        return clean.map((p) => ({
          ...p,
          coverImage: resolveCoverImage(p.coverImage, p.content),
        }));
      }
    } catch {}
    return [];
  }

  if (!globalThis.__GLOBAL_POSTS__) {
    globalThis.__GLOBAL_POSTS__ = [];
  }
  return globalThis.__GLOBAL_POSTS__;
}

function saveStoredPosts(posts: Post[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      localStorage.setItem("devlog_last_sync", Date.now().toString());
      window.dispatchEvent(new Event("posts_updated"));

      if ("BroadcastChannel" in window) {
        const bc = new BroadcastChannel("devlog_posts_sync");
        bc.postMessage({ type: "posts_updated", timestamp: Date.now() });
        bc.close();
      }
    } catch {}
  } else {
    globalThis.__GLOBAL_POSTS__ = posts;
  }
}

export interface GetPostsParams {
  categorySlug?: string;
  tagSlug?: string;
  status?: PostStatus | "all";
  query?: string;
  authorId?: string;
  limit?: number;
}

export async function getPosts(params: GetPostsParams = {}): Promise<Post[]> {
  // Server-side: Query server DB directly to guarantee fresh disk data for SSR and all network devices!
  if (typeof window === "undefined") {
    try {
      const { db } = await import("@/lib/server/db");
      const posts = db.getPosts({
        status: params.status,
        categorySlug: params.categorySlug,
        tagSlug: params.tagSlug,
        query: params.query,
        limit: params.limit,
      });
      return posts.map((p) => ({
        ...p,
        coverImage: resolveCoverImage(p.coverImage, p.content),
      }));
    } catch {
      return [];
    }
  }

  // Client-side: Fetch live REST API with cache-busting headers
  let serverPosts: Post[] | null = null;
  try {
    const queryParams = new URLSearchParams();
    if (params.status) queryParams.set("status", params.status);
    if (params.categorySlug) queryParams.set("categorySlug", params.categorySlug);
    if (params.tagSlug) queryParams.set("tagSlug", params.tagSlug);
    if (params.query) queryParams.set("query", params.query);
    if (params.limit) queryParams.set("limit", params.limit.toString());
    queryParams.set("_t", Date.now().toString());

    const res = await fetch(`/api/posts?${queryParams.toString()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
      },
    });
    if (res.ok) {
      const apiPosts = await res.json();
      if (Array.isArray(apiPosts)) {
        serverPosts = apiPosts.map((p: any) => ({
          ...p,
          coverImage: resolveCoverImage(p.coverImage, p.content),
        }));
      }
    }
  } catch {}

  const localPosts = getStoredPosts();
  const mergedMap = new Map<string, Post>();

  localPosts.forEach((p) => mergedMap.set(p.id, p));

  if (serverPosts) {
    serverPosts.forEach((p) => mergedMap.set(p.id, p));
  }

  let result = Array.from(mergedMap.values());

  if (params.status && params.status !== "all") {
    result = result.filter((p) => p.status === params.status);
  } else if (!params.status) {
    result = result.filter((p) => p.status === "published");
  }

  if (params.categorySlug) {
    result = result.filter((p) => p.category.slug === params.categorySlug);
  }

  if (params.tagSlug) {
    result = result.filter((p) => p.tags.some((t) => t.slug === params.tagSlug));
  }

  if (params.authorId) {
    result = result.filter((p) => p.author.id === params.authorId);
  }

  if (params.query) {
    const q = params.query.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.name.toLowerCase().includes(q))
    );
  }

  result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (params.limit) {
    result = result.slice(0, params.limit);
  }

  if (typeof window !== "undefined" && result.length > 0) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(mergedMap.values())));
    } catch {}
  }

  return result;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (typeof window === "undefined") {
    try {
      const { db } = await import("@/lib/server/db");
      const post = db.getPostBySlug(slug) || db.getPostById(slug);
      if (!post) return null;
      return {
        ...post,
        coverImage: resolveCoverImage(post.coverImage, post.content),
      };
    } catch {
      return null;
    }
  }

  try {
    const res = await fetch(`/api/posts/${encodeURIComponent(slug)}?_t=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
      },
    });
    if (res.ok) {
      const item = await res.json();
      if (item && !item.error && item.title) {
        return {
          ...item,
          coverImage: resolveCoverImage(item.coverImage, item.content),
        };
      }
    }
  } catch {}

  const posts = await getPosts({ status: "all" });
  const post = posts.find((p) => p.slug === slug || p.id === slug);
  return post ? { ...post } : null;
}

export async function getPostById(id: string): Promise<Post | null> {
  if (typeof window === "undefined") {
    try {
      const { db } = await import("@/lib/server/db");
      const post = db.getPostById(id) || db.getPostBySlug(id);
      if (!post) return null;
      return {
        ...post,
        coverImage: resolveCoverImage(post.coverImage, post.content),
      };
    } catch {
      return null;
    }
  }

  try {
    const res = await fetch(`/api/posts/${encodeURIComponent(id)}?_t=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
      },
    });
    if (res.ok) {
      const item = await res.json();
      if (item && !item.error && item.title) {
        return {
          ...item,
          coverImage: resolveCoverImage(item.coverImage, item.content),
        };
      }
    }
  } catch {}

  const posts = await getPosts({ status: "all" });
  const post = posts.find((p) => p.id === id || p.slug === id);
  return post ? { ...post } : null;
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getPosts({ status: "published" });
  return posts.filter((p) => p.featured || p.status === "published");
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const realCover = resolveCoverImage(input.coverImage, input.content);
  const posts = getStoredPosts();
  const category = MOCK_CATEGORIES.find((c) => c.id === input.categoryId) || MOCK_CATEGORIES[0];
  const tags = MOCK_TAGS.filter((t) => input.tagIds?.includes(t.id));
  const author = MOCK_AUTHORS[0];

  const newPost: Post = {
    id: `post-${Date.now()}`,
    slug: input.slug || slugify(input.title),
    title: input.title,
    excerpt: input.excerpt || input.content.replace(/!\[.*?\]\(.*?\)/g, "").slice(0, 140) + "...",
    content: input.content,
    coverImage: realCover,
    category,
    tags,
    author,
    status: input.status,
    language: input.language || 'en',
    publishedAt: new Date().toISOString(),
    readingTimeMinutes: calculateReadingTime(input.content),
    views: 1,
    likes: 0,
    bookmarksCount: 0,
    featured: input.status === "published",
    seo: input.seo,
  };

  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (res.ok) {
        const serverPost = await res.json();
        const finalPosts = [serverPost, ...posts.filter((p) => p.id !== serverPost.id)];
        saveStoredPosts(finalPosts);
        return serverPost;
      }
    } catch {}
  }

  const updated = [newPost, ...posts];
  saveStoredPosts(updated);
  return newPost;
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post> {
  if (updates.coverImage || updates.content) {
    updates.coverImage = resolveCoverImage(updates.coverImage, updates.content);
  }

  const posts = getStoredPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Post not found with ID ${id}`);
  }

  const updatedPost: Post = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
    readingTimeMinutes: updates.content
      ? calculateReadingTime(updates.content)
      : posts[index].readingTimeMinutes,
  };

  posts[index] = updatedPost;
  saveStoredPosts(posts);

  if (typeof window !== "undefined") {
    fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    }).catch(() => {});
  }

  return updatedPost;
}

export async function deletePost(idOrSlug: string): Promise<boolean> {
  const posts = getStoredPosts();
  const initialLength = posts.length;
  const target = posts.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  const targetId = target ? target.id : idOrSlug;

  const filtered = posts.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
  saveStoredPosts(filtered);

  if (typeof window !== "undefined") {
    fetch(`/api/posts/${targetId}`, { method: "DELETE" }).catch(() => {});
  }

  return filtered.length < initialLength;
}

export async function toggleLikePost(id: string): Promise<number> {
  const posts = getStoredPosts();
  const post = posts.find((p) => p.id === id || p.slug === id);
  if (post) {
    post.likes = (post.likes || 0) + 1;
    saveStoredPosts(posts);

    if (typeof window !== "undefined") {
      fetch(`/api/posts/${post.id}/like`, { method: "POST" }).catch(() => {});
      window.dispatchEvent(new CustomEvent("likes_updated", { detail: { id: post.id, likes: post.likes } }));
    }
    return post.likes;
  }
  return 0;
}

export async function incrementPostView(id: string): Promise<number> {
  const posts = getStoredPosts();
  const post = posts.find((p) => p.id === id || p.slug === id);
  if (post) {
    post.views = (post.views || 0) + 1;
    saveStoredPosts(posts);

    if (typeof window !== "undefined") {
      fetch(`/api/posts/${post.id}/view`, { method: "POST" }).catch(() => {});
      window.dispatchEvent(new CustomEvent("views_updated", { detail: { id: post.id, views: post.views } }));
    }
    return post.views;
  }
  return 0;
}
