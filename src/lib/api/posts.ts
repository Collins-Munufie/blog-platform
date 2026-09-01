import { Post, CreatePostInput, PostStatus } from "../types";
import { MOCK_POSTS, MOCK_CATEGORIES, MOCK_TAGS, MOCK_AUTHORS } from "../mock-data";
import { calculateReadingTime, slugify } from "../utils";

const STORAGE_KEY = "devlog_posts_store";

function getStoredPosts(): Post[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore JSON error
    }
  }
  return [...MOCK_POSTS];
}

function saveStoredPosts(posts: Post[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch {
      // Ignore
    }
  }
}

// In-memory runtime state (seeded with mock posts)
let postsState: Post[] = [...MOCK_POSTS];

export interface GetPostsParams {
  categorySlug?: string;
  tagSlug?: string;
  status?: PostStatus | "all";
  query?: string;
  authorId?: string;
  limit?: number;
}

export async function getPosts(params: GetPostsParams = {}): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 20));

  // If in browser, sync from localStorage if present
  if (typeof window !== "undefined") {
    postsState = getStoredPosts();
  }

  let result = [...postsState];

  if (params.status && params.status !== "all") {
    result = result.filter((p) => p.status === params.status);
  } else if (!params.status) {
    // Default to published only for reader facing queries
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

  // Sort descending by publishedAt
  result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (params.limit) {
    result = result.slice(0, params.limit);
  }

  return result;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 20));
  if (typeof window !== "undefined") {
    postsState = getStoredPosts();
  }
  const post = postsState.find((p) => p.slug === slug);
  return post ? { ...post } : null;
}

export async function getPostById(id: string): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 20));
  if (typeof window !== "undefined") {
    postsState = getStoredPosts();
  }
  const post = postsState.find((p) => p.id === id);
  return post ? { ...post } : null;
}

export async function getFeaturedPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 20));
  if (typeof window !== "undefined") {
    postsState = getStoredPosts();
  }
  return postsState.filter((p) => p.featured && p.status === "published");
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 60));

  if (typeof window !== "undefined") {
    postsState = getStoredPosts();
  }

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
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
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

  postsState.unshift(newPost);
  saveStoredPosts(postsState);
  return newPost;
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 60));

  if (typeof window !== "undefined") {
    postsState = getStoredPosts();
  }

  const index = postsState.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Post not found with ID ${id}`);
  }

  const updated: Post = {
    ...postsState[index],
    ...updates,
    updatedAt: new Date().toISOString(),
    readingTimeMinutes: updates.content
      ? calculateReadingTime(updates.content)
      : postsState[index].readingTimeMinutes,
  };

  postsState[index] = updated;
  saveStoredPosts(postsState);
  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  if (typeof window !== "undefined") {
    postsState = getStoredPosts();
  }
  const initialLength = postsState.length;
  postsState = postsState.filter((p) => p.id !== id);
  saveStoredPosts(postsState);
  return postsState.length < initialLength;
}

export async function toggleLikePost(id: string): Promise<number> {
  if (typeof window !== "undefined") {
    postsState = getStoredPosts();
  }
  const post = postsState.find((p) => p.id === id);
  if (post) {
    post.likes += 1;
    saveStoredPosts(postsState);
    return post.likes;
  }
  return 0;
}
