import { Author, Category, Tag, Post, Comment, AnalyticsSummary } from "./types";

export const MOCK_AUTHORS: Author[] = [
  {
    id: "auth-1",
    name: "Elena Rostova",
    handle: "erostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Staff Infrastructure Engineer",
    bio: "Passionate about distributed systems, edge computing, and modern TypeScript architecture. Writing technical deep-dives.",
    twitter: "https://twitter.com",
    github: "https://github.com",
    website: "https://elena.dev",
  },
  {
    id: "auth-2",
    name: "Marcus Vance",
    handle: "marcusv",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Principal Product Designer & Front-End Architect",
    bio: "Bridging the chasm between design systems and high-performance frontends. Core contributor to UI toolkits.",
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
  {
    id: "auth-3",
    name: "Aria Chen",
    handle: "ariachen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    role: "AI Research & Systems Engineer",
    bio: "Exploring agentic workflows, LLM distillation, and real-time streaming architectures.",
    github: "https://github.com",
  },
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Engineering & Architecture",
    slug: "engineering-architecture",
    description: "Deep technical articles on distributed systems, databases, and microservices.",
    color: "indigo",
    postCount: 14,
  },
  {
    id: "cat-2",
    name: "Frontend & UI Systems",
    slug: "frontend-ui-systems",
    description: "Modern web architecture, React performance, CSS layouts, and design systems.",
    color: "violet",
    postCount: 22,
  },
  {
    id: "cat-3",
    name: "AI & Agentic Systems",
    slug: "ai-agentic-systems",
    description: "Generative models, multi-agent frameworks, and building AI-driven software.",
    color: "emerald",
    postCount: 9,
  },
  {
    id: "cat-4",
    name: "DevOps & Cloud Native",
    slug: "devops-cloud-native",
    description: "Kubernetes, CI/CD pipelines, edge networks, and observability.",
    color: "amber",
    postCount: 8,
  },
];

export const MOCK_TAGS: Tag[] = [
  { id: "tag-1", name: "Next.js", slug: "nextjs", postCount: 18 },
  { id: "tag-2", name: "TypeScript", slug: "typescript", postCount: 25 },
  { id: "tag-3", name: "PostgreSQL", slug: "postgresql", postCount: 11 },
  { id: "tag-4", name: "System Design", slug: "system-design", postCount: 14 },
  { id: "tag-5", name: "Tailwind CSS", slug: "tailwind-css", postCount: 16 },
  { id: "tag-6", name: "LLMs", slug: "llms", postCount: 9 },
  { id: "tag-7", name: "Performance", slug: "performance", postCount: 12 },
  { id: "tag-8", name: "Architecture", slug: "architecture", postCount: 15 },
];

export const MOCK_POSTS: Post[] = [
  {
    id: "post-1",
    slug: "mastering-nextjs-server-actions-and-caching",
    title: "Mastering Next.js Server Actions, Caching Layers, and Edge Mutations",
    excerpt: "A comprehensive deep dive into building ultra-fast web applications with Next.js App Router, deterministic cache invalidation, and secure server actions.",
    content: `
### Introduction

Modern web architecture is shifting rapidly toward unified server-client models. In this guide, we explore how Next.js App Router redefines data mutation, edge caching, and server-side safety with zero client runtime overhead for pure data layers.

\`\`\`typescript
// Server Action with validation & revalidation
'use server'

import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(20),
});

export async function createPostAction(formData: FormData) {
  const parsed = CreatePostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!parsed.success) {
    return { error: 'Validation failed' };
  }

  // Database persistence
  await db.post.create({ data: parsed.data });
  
  // Deterministic cache purge
  revalidateTag('posts-feed');
  return { success: true };
}
\`\`\`

### Caching Tiers Explained

When architecting a high-throughput platform, caching isn't just about saving database roundtrips—it dictates the entire user experience and latency budget.

> **Key Rule**: Never rely on a single global cache. Segment your cache into Request Memoization, Data Cache, Full Route Cache, and Router Cache.

1. **Request Memoization**: Deduplicates identical \`fetch\` requests within a single React component render tree.
2. **Data Cache**: Persistent HTTP cache across user sessions and server restarts.
3. **Full Route Cache**: Static HTML/RSC payloads cached at build or ISR revalidation time.
4. **Router Cache**: Client-side in-memory cache preserved during page transitions.

### Optimistic UI & Progressive Enhancement

By combining React's \`useOptimistic\` hook with Server Actions, users perceive instantaneous mutations while background validation runs smoothly:

\`\`\`tsx
'use client'

import { useOptimistic } from 'react';

export function LikeButton({ post, onLike }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    post.likes,
    (state, amount: number) => state + amount
  );

  return (
    <button
      onClick={async () => {
        addOptimisticLike(1);
        await onLike(post.id);
      }}
      className="btn-interactive"
    >
      ❤️ {optimisticLikes}
    </button>
  );
}
\`\`\`

### Conclusion

Leveraging these server-first primitives guarantees lower bundle sizes, instantaneous edge delivery, and rock-solid reliability across unpredictable client networks.
`,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    category: MOCK_CATEGORIES[0],
    tags: [MOCK_TAGS[0], MOCK_TAGS[1], MOCK_TAGS[6]],
    author: MOCK_AUTHORS[0],
    status: "published",
    publishedAt: "2026-08-24T14:30:00Z",
    readingTimeMinutes: 7,
    views: 14280,
    likes: 842,
    bookmarksCount: 310,
    featured: true,
    seo: {
      metaTitle: "Mastering Next.js Server Actions & Caching Strategies",
      metaDescription: "Learn how to optimize Next.js server actions, cache tags, and optimistic UI for maximum performance.",
    },
  },
  {
    id: "post-2",
    slug: "design-systems-at-scale-tokens-and-accessibility",
    title: "Building Resilient Design Systems: Semantic Tokens, Micro-Interactions, and A11y",
    excerpt: "How to structure multi-brand CSS tokens, accessible component primitives, and delightful micro-interactions without performance compromises.",
    content: `
### The Core Anatomy of Modern Design Tokens

Design tokens are the visual atoms of your application. When scaling a frontend across multiple products or platforms, hardcoding hex codes or pixel dimensions creates compounding technical debt.

\`\`\`css
:root {
  /* Primitive Tokens */
  --palette-indigo-500: #6366f1;
  --palette-slate-900: #0f172a;

  /* Semantic Tokens */
  --color-brand-primary: var(--palette-indigo-500);
  --color-surface-background: #ffffff;
  --color-text-primary: var(--palette-slate-900);
}

.dark {
  --color-surface-background: #090d16;
  --color-text-primary: #f8fafc;
}
\`\`\`

### Accessibility by Construction (A11y)

Never compromise accessibility for aesthetic flair. Every custom dropdown, modal dialog, and tooltip must adhere to WAI-ARIA authoring practices:

* **Keyboard Navigation:** Full support for \`Tab\`, \`Shift+Tab\`, \`Enter\`, \`Space\`, and \`Escape\`.
* **Focus Trapping:** Prevent focus from escaping modal overlays.
* **Screen Reader Announcers:** Proper use of \`aria-live="polite"\` for dynamic counters and toast notifications.

### Micro-Interactions that Delight

Smooth transitions create a sense of tactile physics. Keep durations between 150ms and 250ms with custom cubic-bezier curves (\`cubic-bezier(0.16, 1, 0.3, 1)\`) for responsive, snappy feel.
`,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    category: MOCK_CATEGORIES[1],
    tags: [MOCK_TAGS[4], MOCK_TAGS[1]],
    author: MOCK_AUTHORS[1],
    status: "published",
    publishedAt: "2026-08-20T09:15:00Z",
    readingTimeMinutes: 5,
    views: 9340,
    likes: 620,
    bookmarksCount: 195,
    featured: false,
  },
  {
    id: "post-3",
    slug: "designing-scalable-multi-agent-ai-architectures",
    title: "Designing Scalable Multi-Agent AI Architectures for Real-Time Coding",
    excerpt: "Exploring actor-model concurrency, state synchronization, and reactive sandboxes for orchestrating collaborative AI subagents in complex development tasks.",
    content: `
### The Multi-Agent Paradigm

When autonomous AI systems tackle complex coding or research tasks, a single monolithic prompt fails due to context rot and attention dilution. Orchestrating specialized subagents provides compartmentalized reasoning.

\`\`\`mermaid
graph LR
  User --> Orchestrator
  Orchestrator --> AgentA[Research Subagent]
  Orchestrator --> AgentB[Architect Subagent]
  Orchestrator --> AgentC[Testing Subagent]
  AgentA --> Knowledge[(Code Graph)]
  AgentB --> Workspace[(Sandbox)]
  AgentC --> Verification[(Test Runner)]
\`\`\`

### Inter-Agent Communication Protocols

Agents communicate via structured messaging protocols with verifiable tool schemas. Key principles:

1. **Explicit Role Boundaries:** Each agent has a focused system prompt and specialized tool access.
2. **Deterministic Sandboxes:** All write operations run in sandboxed workspaces with diff reviews.
3. **Structured Handoffs:** Structured artifacts (implementation plans, test reports) guarantee loss-less state transfers.

\`\`\`json
{
  "sender": "research-agent-01",
  "recipient": "planner-agent",
  "action": "TASK_COMPLETED",
  "payload": {
    "summary": "Found 3 potential race conditions in websocket worker",
    "affectedFiles": ["src/workers/ws.ts", "src/lib/socket-pool.ts"]
  }
}
\`\`\`

### Real-World Performance & Cost Tuning

To prevent astronomical token usage:
* Use light models (\`Flash\` tier) for routine file lookups and grep passes.
* Reserve deep reasoning models for complex refactors, architectural designs, and root cause debugging.
`,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    category: MOCK_CATEGORIES[2],
    tags: [MOCK_TAGS[5], MOCK_TAGS[3], MOCK_TAGS[7]],
    author: MOCK_AUTHORS[2],
    status: "published",
    publishedAt: "2026-08-16T11:00:00Z",
    readingTimeMinutes: 9,
    views: 18450,
    likes: 1320,
    bookmarksCount: 540,
    featured: true,
  },
  {
    id: "post-4",
    slug: "zero-downtime-postgresql-migrations-at-scale",
    title: "Zero-Downtime PostgreSQL Schema Migrations in High-Traffic Systems",
    excerpt: "How to perform column renames, index additions, and table partitioning without holding exclusive table locks or dropping user requests.",
    content: `
### The Table Locking Trap

In high-write databases, executing a naive \`ALTER TABLE ADD COLUMN ... DEFAULT 'foo'\` or adding an index synchronously can lock out incoming transactions, causing cascading connection pool exhaustion.

\`\`\`sql
-- ❌ BAD: Exclusive table lock while indexing millions of rows
CREATE INDEX idx_users_email ON users(email);

-- ✅ GOOD: Non-blocking concurrent index creation
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
\`\`\`

### The Expand/Contract Migration Pattern

For column renames or type modifications:

1. **Expand**: Add the new column nullable.
2. **Dual-Write**: Update application code to write to both old and new columns.
3. **Backfill**: Incrementally backfill existing rows in manageable batches (e.g. 5,000 rows per chunk).
4. **Contract**: Switch reads to the new column, and safely drop the old column once verified.

### Safe Constraint Validation

Never validate foreign keys or check constraints on large tables in one step:

\`\`\`sql
-- Step 1: Add constraint NOT VALID (instantaneous metadata lock)
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_user 
FOREIGN KEY (user_id) REFERENCES users(id) 
NOT VALID;

-- Step 2: Validate without locking new writes
ALTER TABLE orders VALIDATE CONSTRAINT fk_orders_user;
\`\`\`
`,
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80",
    category: MOCK_CATEGORIES[0],
    tags: [MOCK_TAGS[2], MOCK_TAGS[3], MOCK_TAGS[7]],
    author: MOCK_AUTHORS[0],
    status: "published",
    publishedAt: "2026-08-10T16:45:00Z",
    readingTimeMinutes: 6,
    views: 11200,
    likes: 740,
    bookmarksCount: 280,
    featured: false,
  },
  {
    id: "post-5",
    slug: "draft-future-of-local-first-software",
    title: "The Architecture of Local-First Software: CRDTs, SQLite, and Sync Engines",
    excerpt: "Why the future of productivity applications relies on instant local mutations with offline-first synchronization protocols.",
    content: `
### Draft Content

Local-first software combines the responsiveness and data ownership of desktop software with the real-time collaboration of modern web apps.

* **Conflict-free Replicated Data Types (CRDTs)**: Merging edits without central consensus.
* **Embedded SQLite**: Zero-latency reads straight from browser WASM or client database.
* **Sync Engine**: Efficient delta synchronization over WebSockets.
`,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    category: MOCK_CATEGORIES[0],
    tags: [MOCK_TAGS[1], MOCK_TAGS[3]],
    author: MOCK_AUTHORS[1],
    status: "draft",
    publishedAt: "2026-09-02T10:00:00Z",
    readingTimeMinutes: 4,
    views: 0,
    likes: 0,
    bookmarksCount: 0,
    featured: false,
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "comm-1",
    postId: "post-1",
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      handle: "davidk",
    },
    content: "The breakdown of the 4 caching tiers in Next.js is one of the clearest explanations I've read. The distinction between Data Cache and Request Memoization cleared up a bug we had in production last week!",
    createdAt: "2026-08-25T10:14:00Z",
    likes: 24,
    replies: [
      {
        id: "comm-1-1",
        postId: "post-1",
        author: {
          name: "Elena Rostova",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          handle: "erostova",
        },
        content: "Thanks David! Glad it helped. Make sure to check out `revalidateTag` for multi-node deployments as well.",
        createdAt: "2026-08-25T11:02:00Z",
        likes: 12,
      },
    ],
  },
  {
    id: "comm-2",
    postId: "post-1",
    author: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      handle: "sarahj_dev",
    },
    content: "How does this approach compare when using a third-party caching layer like Redis or Cloudflare Workers KV in front of Next.js?",
    createdAt: "2026-08-26T14:40:00Z",
    likes: 8,
  },
];

export const MOCK_ANALYTICS: AnalyticsSummary = {
  totalViews: 53270,
  totalLikes: 3522,
  totalComments: 184,
  avgReadTimeMinutes: 6.4,
  viewsTrend: [
    { date: "Aug 1", views: 1200, visitors: 940 },
    { date: "Aug 5", views: 1840, visitors: 1420 },
    { date: "Aug 10", views: 2450, visitors: 1890 },
    { date: "Aug 15", views: 3100, visitors: 2400 },
    { date: "Aug 20", views: 4200, visitors: 3300 },
    { date: "Aug 25", views: 5600, visitors: 4400 },
    { date: "Aug 30", views: 6800, visitors: 5120 },
  ],
  topPosts: [
    { id: "post-3", title: "Designing Scalable Multi-Agent AI Architectures", views: 18450, likes: 1320, slug: "designing-scalable-multi-agent-ai-architectures" },
    { id: "post-1", title: "Mastering Next.js Server Actions & Caching", views: 14280, likes: 842, slug: "mastering-nextjs-server-actions-and-caching" },
    { id: "post-4", title: "Zero-Downtime PostgreSQL Schema Migrations", views: 11200, likes: 740, slug: "zero-downtime-postgresql-migrations-at-scale" },
    { id: "post-2", title: "Building Resilient Design Systems", views: 9340, likes: 620, slug: "design-systems-at-scale-tokens-and-accessibility" },
  ],
  trafficSources: [
    { name: "Direct / Organic Search", percentage: 48, color: "#6366f1" },
    { name: "Social (Twitter / X, LinkedIn)", percentage: 28, color: "#8b5cf6" },
    { name: "Tech News / Hacker News", percentage: 16, color: "#10b981" },
    { name: "Referrals & RSS", percentage: 8, color: "#f59e0b" },
  ],
};
