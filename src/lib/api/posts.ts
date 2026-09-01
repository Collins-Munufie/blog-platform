import { Post, CreatePostInput, PostStatus } from "../types";
import { MOCK_POSTS, MOCK_CATEGORIES, MOCK_TAGS, MOCK_AUTHORS } from "../mock-data";
import { calculateReadingTime, slugify } from "../utils";

const STORAGE_KEY = "devlog_posts_store";

// Use globalThis to persist in-memory across Server Component requests in Node.js runtime
declare global {
  var __GLOBAL_POSTS__: Post[] | undefined;
}

function getGlobalPosts(): Post[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return [...MOCK_POSTS];
  }

  if (!globalThis.__GLOBAL_POSTS__) {
    globalThis.__GLOBAL_POSTS__ = [...MOCK_POSTS];
  }
  return globalThis.__GLOBAL_POSTS__;
}

function saveGlobalPosts(posts: Post[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      // Notify other components on client
      window.dispatchEvent(new Event("posts_updated"));
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
  const posts = getGlobalPosts();
  let result = [...posts];

  if (params.status && params.status !== "all") {
    result = result.filter((p) => p.status === params.status);
  } else if (!params.status) {
    // Default to published only for public reader queries
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

  // Sort descending by publishedAt / createdAt
  result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (params.limit) {
    result = result.slice(0, params.limit);
  }

  return result;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = getGlobalPosts();
  const post = posts.find((p) => p.slug === slug);
  return post ? { ...post } : null;
}

export async function getPostById(id: string): Promise<Post | null> {
  const posts = getGlobalPosts();
  const post = posts.find((p) => p.id === id);
  return post ? { ...post } : null;
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = getGlobalPosts();
  return posts.filter((p) => p.featured && p.status === "published");
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const posts = getGlobalPosts();

  const category = MOCK_CATEGORIES.find((c) => c.id === input.categoryId) || MOCK_CATEGORIES[0];
  const tags = MOCK_TAGS.filter((t) => input.tagIds?.includes(t.id));
  const author = MOCK_AUTHORS.find((a) => a.id === input.authorId) || MOCK_AUTHORS[0];

  const newPost: Post = {
    id: `post-${Date.now()}`,
    slug: input.slug || slugify(input.title),
    title: input.title,
    excerpt: input.excerpt || input.content.slice(0, 140) + "...",
    content: input.content,
    coverImage:
      input.coverImage ||
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    category,
    tags,
    author,
    status: input.status,
    language: input.language || 'en',
    publishedAt: new Date().toISOString(),
    readingTimeMinutes: calculateReadingTime(input.content),
    views: 0,
    likes: 0,
    bookmarksCount: 0,
    featured: input.status === "published",
    seo: input.seo,
  };

  const updated = [newPost, ...posts];
  saveGlobalPosts(updated);

  // If in browser, also sync with API endpoint in background
  if (typeof window !== "undefined") {
    try {
      fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      }).catch(() => {});
    } catch {}
  }

  return newPost;
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post> {
  const posts = getGlobalPosts();
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
  saveGlobalPosts(posts);

  if (typeof window !== "undefined") {
    try {
      fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      }).catch(() => {});
    } catch {}
  }

  return updatedPost;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = getGlobalPosts();
  const initialLength = posts.length;
  const filtered = posts.filter((p) => p.id !== id);
  saveGlobalPosts(filtered);

  if (typeof window !== "undefined") {
    try {
      fetch(`/api/posts/${id}`, { method: "DELETE" }).catch(() => {});
    } catch {}
  }

  return filtered.length < initialLength;
}

export async function toggleLikePost(id: string): Promise<number> {
  const posts = getGlobalPosts();
  const post = posts.find((p) => p.id === id);
  if (post) {
    post.likes = (post.likes || 0) + 1;
    saveGlobalPosts(posts);
    return post.likes;
  }
  return 0;
}
