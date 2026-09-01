import {
  Post,
  Category,
  Tag,
  Author,
  Comment,
  WriterApplication,
  AuthorBadge,
  AuditLog,
  HelpdeskTicket,
  MediaItem,
} from "@/lib/types";
import {
  MOCK_POSTS,
  MOCK_CATEGORIES,
  MOCK_TAGS,
  MOCK_AUTHORS,
  MOCK_COMMENTS,
  MOCK_MEDIA_ITEMS,
} from "@/lib/mock-data";
import { calculateReadingTime, slugify } from "@/lib/utils";

interface DatabaseSchema {
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  authors: Author[];
  comments: Comment[];
  badges: AuthorBadge[];
  media: MediaItem[];
  subscribers: Array<{ email: string; subscribedAt: string; status: "active" | "unsubscribed" }>;
}

declare global {
  var __SERVER_DB__: DatabaseSchema | undefined;
}

const DEFAULT_COVER = "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80";

function getInitialData(): DatabaseSchema {
  const cleanedPosts = MOCK_POSTS.map((p) => ({
    ...p,
    coverImage: p.coverImage.includes("photo-1526374965328-7f61d4dc18c5")
      ? DEFAULT_COVER
      : p.coverImage || DEFAULT_COVER,
  }));

  const cleanedMedia = MOCK_MEDIA_ITEMS.map((m) => ({
    ...m,
    url: m.url.includes("photo-1526374965328-7f61d4dc18c5") ? DEFAULT_COVER : m.url,
  }));

  return {
    posts: cleanedPosts,
    categories: MOCK_CATEGORIES,
    tags: MOCK_TAGS,
    authors: MOCK_AUTHORS,
    comments: MOCK_COMMENTS,
    badges: [
      {
        id: "badge-khophi",
        badgeCode: "GH-PRESS-2026-001",
        authorId: "auth-khophi",
        authorName: "Khophi",
        authorHandle: "khophi_the_blogger",
        avatar: "/khophi_profile.jpg",
        role: "Lead Journalist & Publication Founder",
        specialization: "African Tech, Fintech Ecosystem & Culture",
        issueDate: "2026-01-01",
        expiryDate: "2027-12-31",
        verificationUrl: "https://khophitheblogger.com/about",
      },
    ],
    media: cleanedMedia,
    subscribers: [
      { email: "reader1@accra.dev", subscribedAt: "2026-08-01T10:00:00Z", status: "active" },
      { email: "kofi@ghanafintech.org", subscribedAt: "2026-08-15T12:00:00Z", status: "active" },
    ],
  };
}

function loadDatabase(): DatabaseSchema {
  if (!globalThis.__SERVER_DB__) {
    globalThis.__SERVER_DB__ = getInitialData();
  }
  return globalThis.__SERVER_DB__;
}

export const db = {
  // Posts CRUD
  getPosts: (filters?: {
    status?: string;
    categorySlug?: string;
    tagSlug?: string;
    query?: string;
    limit?: number;
  }) => {
    const data = loadDatabase();
    let result = [...data.posts];

    if (filters?.status && filters.status !== "all") {
      result = result.filter((p) => p.status === filters.status);
    } else if (!filters?.status) {
      result = result.filter((p) => p.status === "published");
    }

    if (filters?.categorySlug) {
      result = result.filter((p) => p.category.slug === filters.categorySlug);
    }

    if (filters?.tagSlug) {
      result = result.filter((p) => p.tags.some((t) => t.slug === filters.tagSlug));
    }

    if (filters?.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.name.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    if (filters?.limit) {
      result = result.slice(0, filters.limit);
    }

    return result;
  },

  getPostById: (id: string) => {
    const data = loadDatabase();
    return data.posts.find((p) => p.id === id) || null;
  },

  getPostBySlug: (slug: string) => {
    const data = loadDatabase();
    return data.posts.find((p) => p.slug === slug) || null;
  },

  createPost: (input: any): Post => {
    const data = loadDatabase();
    const category = data.categories.find((c) => c.id === input.categoryId) || data.categories[0];
    const tags = data.tags.filter((t) => input.tagIds?.includes(t.id));
    const author = data.authors[0];

    const cleanCover = input.coverImage?.includes("photo-1526374965328-7f61d4dc18c5")
      ? DEFAULT_COVER
      : input.coverImage || DEFAULT_COVER;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      slug: input.slug || slugify(input.title),
      title: input.title,
      excerpt: input.excerpt || input.content.slice(0, 140) + "...",
      content: input.content,
      coverImage: cleanCover,
      category,
      tags,
      author,
      status: input.status || "published",
      language: input.language || "en",
      publishedAt: new Date().toISOString(),
      readingTimeMinutes: calculateReadingTime(input.content),
      views: 0,
      likes: 0,
      bookmarksCount: 0,
      featured: input.status === "published",
      seo: input.seo,
    };

    data.posts.unshift(newPost);
    return newPost;
  },

  updatePost: (id: string, updates: Partial<Post>): Post => {
    const data = loadDatabase();
    const index = data.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Post ${id} not found`);
    }

    if (updates.coverImage && updates.coverImage.includes("photo-1526374965328-7f61d4dc18c5")) {
      updates.coverImage = DEFAULT_COVER;
    }

    const updated: Post = {
      ...data.posts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
      readingTimeMinutes: updates.content
        ? calculateReadingTime(updates.content)
        : data.posts[index].readingTimeMinutes,
    };

    data.posts[index] = updated;
    return updated;
  },

  deletePost: (id: string): boolean => {
    const data = loadDatabase();
    const initialLen = data.posts.length;
    data.posts = data.posts.filter((p) => p.id !== id);
    return data.posts.length < initialLen;
  },

  toggleLikePost: (id: string): number => {
    const data = loadDatabase();
    const post = data.posts.find((p) => p.id === id);
    if (post) {
      post.likes = (post.likes || 0) + 1;
      return post.likes;
    }
    return 0;
  },

  // Author Profile
  getProfile: () => {
    const data = loadDatabase();
    return data.authors[0];
  },

  updateProfile: (profileData: Partial<Author>) => {
    const data = loadDatabase();
    data.authors[0] = { ...data.authors[0], ...profileData };
    return data.authors[0];
  },

  // Categories & Tags
  getCategories: () => {
    const data = loadDatabase();
    return data.categories.map((c) => ({
      ...c,
      postCount: data.posts.filter((p) => p.category.id === c.id && p.status === "published").length,
    }));
  },

  getTags: () => {
    const data = loadDatabase();
    return data.tags.map((t) => ({
      ...t,
      postCount: data.posts.filter((p) => p.tags.some((pt) => pt.id === t.id) && p.status === "published").length,
    }));
  },

  // Comments
  getCommentsByPostId: (postId: string) => {
    const data = loadDatabase();
    return data.comments.filter((c) => c.postId === postId);
  },

  addComment: (input: { postId: string; authorName: string; content: string; email?: string; website?: string }) => {
    const data = loadDatabase();
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      postId: input.postId,
      author: {
        name: input.authorName,
        avatar: "/khophi_profile.jpg",
        handle: input.authorName.toLowerCase().replace(/\s+/g, "_"),
      },
      content: input.content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    data.comments.unshift(newComment);
    return newComment;
  },

  // Newsletter
  subscribeNewsletter: (email: string) => {
    const data = loadDatabase();
    const existing = data.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (!existing) {
      data.subscribers.push({
        email,
        subscribedAt: new Date().toISOString(),
        status: "active",
      });
    }
    return { success: true, count: data.subscribers.filter((s) => s.status === "active").length };
  },

  // Admin Stats
  getAdminStats: () => {
    const data = loadDatabase();
    const totalReaders = data.posts.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalLikes = data.posts.reduce((sum, p) => sum + (p.likes || 0), 0);
    const publishedCount = data.posts.filter((p) => p.status === "published").length;
    const draftCount = data.posts.filter((p) => p.status === "draft").length;
    const subscribersCount = data.subscribers.filter((s) => s.status === "active").length;

    return {
      totalReaders,
      totalLikes,
      publishedCount,
      draftCount,
      subscribersCount,
      pendingApps: 1,
      openTickets: 0,
      totalArticles: data.posts.length,
      activeBadges: data.badges.length,
    };
  },

  // Press Badges
  getBadges: () => {
    const data = loadDatabase();
    return data.badges;
  },

  createBadge: (input: any) => {
    const data = loadDatabase();
    const newBadge: AuthorBadge = {
      id: `badge-${Date.now()}`,
      badgeCode: `GH-PRESS-2026-${Math.floor(100 + Math.random() * 900)}`,
      authorId: `auth-${Date.now()}`,
      authorName: input.authorName,
      authorHandle: input.authorName.toLowerCase().replace(/\s+/g, "_"),
      avatar: input.avatar || "/khophi_profile.jpg",
      role: input.role || "Journalist & Contributor",
      specialization: input.specialization || "Tech & Culture",
      issueDate: new Date().toISOString().split("T")[0],
      expiryDate: "2027-12-31",
      verificationUrl: "https://khophitheblogger.com/about",
    };
    data.badges.unshift(newBadge);
    return newBadge;
  },

  deleteBadge: (id: string) => {
    const data = loadDatabase();
    data.badges = data.badges.filter((b) => b.id !== id);
    return true;
  },
};
