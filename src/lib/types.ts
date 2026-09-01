export type PostStatus = 'draft' | 'published' | 'scheduled';

export interface Author {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  role: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    avatar: string;
    handle?: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or rich text
  coverImage: string;
  category: Category;
  tags: Tag[];
  author: Author;
  status: PostStatus;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  views: number;
  likes: number;
  bookmarksCount: number;
  featured?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
}

export interface CreatePostInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categoryId: string;
  tagIds: string[];
  status: PostStatus;
  authorId: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface AnalyticsSummary {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  avgReadTimeMinutes: number;
  viewsTrend: { date: string; views: number; visitors: number }[];
  topPosts: { id: string; title: string; views: number; likes: number; slug: string }[];
  trafficSources: { name: string; percentage: number; color: string }[];
}
