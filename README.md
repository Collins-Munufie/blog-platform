# DevLog — Full-Stack Blog Platform (Frontend Architecture)

A modern, high-performance engineering blog and creator studio built with **Next.js 14 (App Router), TypeScript, Tailwind CSS, and Lucide Icons**.

---

## 🚀 Key Features

### 📖 1. Reader Experience
- **Hero Spotlight & Category Feeds**: Clean editorial layout showcasing featured deep-dives, trending posts, and category exploration.
- **Article Reader View (`/blog/[slug]`)**:
  - Scroll-spied sticky **Table of Contents**.
  - Custom code blocks with **Copy to Clipboard** buttons.
  - Multi-tier reaction bar (Claps/Likes, Bookmarks, Copy Link, Native Share).
  - Rich **Author Bio Card** and Related Publications recommendations.
  - Interactive **Comments & Discussion** engine with nested replies.
- **Global Search (`⌘K` / `Ctrl+K`)**: Fast modal command palette with instant search across articles and topic tags.
- **Dark / Light Mode**: Seamless system-aware theme transitions via `next-themes`.
- **Responsive Navigation**: Mobile slide-out drawer with quick actions.

### ✍️ 2. Creator Studio & Admin Dashboard (`/dashboard`)
- **Executive Analytics**: KPI cards for Total Reads, Reactions, Discussions, and 30-day traffic velocity charts.
- **Post Manager (`/dashboard/posts`)**: Filterable data table by status (*All*, *Published*, *Drafts*) with direct edit/delete capabilities.
- **Rich Post Editor (`/dashboard/posts/new` & `/dashboard/posts/[id]/edit`)**:
  - Multi-mode interface: **Write Mode**, **Split View**, and **Live Reader Preview**.
  - Markdown formatting toolbar (Headings, Bold, Italic, Code blocks, Quotes, Lists, Image embeds, Links).
  - Real-time word count and reading time calculation.
  - **Publishing Settings Drawer**: Custom slug generator, Cover image upload/preset picker, Categories, Tags, and a live **Google Search (SERP) Simulator**.

---

## 📂 Project Structure

```
scratch/blog-platform/
├── src/
│   ├── app/
│   │   ├── (public)/                 # Reader-facing routes (Home, Blog reader, Categories, Author, About)
│   │   ├── (dashboard)/              # Creator studio & post editor
│   │   ├── globals.css               # Tailwind & custom scrollbar styles
│   │   └── layout.tsx                # Root layout with ThemeProvider
│   ├── components/
│   │   ├── public/                   # Navbar, HeroPost, PostCard, ArticleContent, TableOfContents, Comments, SearchDialog
│   │   ├── dashboard/                # Editor, Sidebar, PostDataTable, AnalyticsChart, PostSettingsModal
│   │   ├── providers/                # ThemeProvider
│   │   └── ui/                       # Button, Badge, Input, Modal, Textarea
│   └── lib/
│       ├── api/                      # Decoupled mock service layer (posts, categories, comments, analytics)
│       ├── types.ts                  # Shared TypeScript interfaces
│       ├── mock-data.ts              # Realistic database mocks with code snippets
│       └── utils.ts                  # Reading time estimator, slugify, date formatting
```

---

## 🛠️ Getting Started

### 1. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the blog.

### 2. Quick Navigation
- **Public Home:** `http://localhost:3000`
- **Article Reader:** `http://localhost:3000/blog/mastering-nextjs-server-actions-and-caching`
- **Categories & Tags:** `http://localhost:3000/categories`
- **Creator Dashboard:** `http://localhost:3000/dashboard`
- **Write New Article:** `http://localhost:3000/dashboard/posts/new`

---

## 🔌 Backend Integration Blueprint (Phase 2)

All data access is encapsulated in `/src/lib/api/`:
- Replace `posts.ts` with Prisma/Drizzle queries against PostgreSQL.
- Replace `comments.ts` with Server Actions with optimistic updates.
- Connect authentication (NextAuth / Auth.js or Clerk) in `(dashboard)/layout.tsx`.
- Connect S3 / Cloudinary / Vercel Blob in `PostSettingsModal.tsx` for cover image uploads.
