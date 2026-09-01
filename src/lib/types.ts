export type PostStatus = 'draft' | 'published' | 'scheduled';
export type LanguageCode = 'en' | 'twi' | 'ga' | 'ewe' | 'hausa';

export interface Author {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  role: string;
  location?: string;
  twitter?: string;
  github?: string;
  website?: string;
  whatsapp?: string;
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

export interface PostReactions {
  love: number;
  fire: number;
  clap: number;
  insightful: number;
}

export interface Series {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  postCount: number;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: Category;
  tags: Tag[];
  author: Author;
  status: PostStatus;
  language: LanguageCode;
  series?: {
    id: string;
    title: string;
    order: number;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  views: number;
  likes: number;
  reactions?: PostReactions;
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
  language?: LanguageCode;
  seriesId?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  dimensions: string;
  category: string;
  uploadedAt: string;
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

/* Admin Types */
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface WriterApplication {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleApplied: string;
  portfolioUrl: string;
  github?: string;
  bio: string;
  sampleTopic: string;
  sampleOutline: string;
  status: ApplicationStatus;
  appliedAt: string;
  reviewedAt?: string;
  notes?: string;
}

export interface AuthorBadge {
  id: string;
  badgeCode: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  avatar: string;
  role: string;
  specialization: string;
  issueDate: string;
  expiryDate: string;
  verificationUrl: string;
}

export type AuditChannel = 'email' | 'webhook' | 'sms' | 'whatsapp' | 'system';
export type AuditDeliveryStatus = 'delivered' | 'queued' | 'failed';

export interface AuditLog {
  id: string;
  eventType: 'newsletter_broadcast' | 'author_onboarded' | 'article_published' | 'system_alert' | 'comment_moderated';
  recipient: string;
  subject: string;
  channel: AuditChannel;
  status: AuditDeliveryStatus;
  timestamp: string;
  payload: {
    message: string;
    metadata: Record<string, any>;
  };
}

export type TicketPriority = 'high' | 'medium' | 'low';
export type TicketStatus = 'open' | 'in_progress' | 'resolved';

export interface HelpdeskTicket {
  id: string;
  ticketNumber: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  category: 'editorial_correction' | 'sponsorship' | 'technical_issue' | 'author_inquiry';
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    sender: string;
    isStaff: boolean;
    text: string;
    timestamp: string;
  }[];
}

export interface AdminKPISummary {
  totalReaders: number;
  totalArticles: number;
  pendingApplications: number;
  activeBadges: number;
  outboxDispatches: number;
  openTickets: number;
}
