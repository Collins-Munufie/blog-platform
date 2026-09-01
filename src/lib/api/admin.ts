import {
  WriterApplication,
  AuthorBadge,
  AuditLog,
  HelpdeskTicket,
  AdminKPISummary,
} from "../types";
import { MOCK_AUTHORS } from "../mock-data";
import { getPosts } from "./posts";

const APPS_STORAGE_KEY = "devlog_admin_applications";
const BADGES_STORAGE_KEY = "devlog_admin_badges";
const AUDIT_STORAGE_KEY = "devlog_admin_audit_logs";
const TICKETS_STORAGE_KEY = "devlog_admin_tickets";

// Initial seed data
const SEED_APPLICATIONS: WriterApplication[] = [
  {
    id: "app-1",
    name: "Dr. Jonathan Hayes",
    email: "j.hayes@mit.edu",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    roleApplied: "Staff Writer (Systems Architecture)",
    portfolioUrl: "https://github.com/jhayes-systems",
    github: "https://github.com/jhayes-systems",
    bio: "Ph.D. in Computer Science specializing in Distributed Consensus (Raft/Paxos) and memory-safe systems programming in Rust.",
    sampleTopic: "Formal Verification of Distributed Key-Value Stores under Network Partitions",
    sampleOutline: "1. The TLA+ Specification\n2. Jepsen Chaos Testing under 40% Packet Loss\n3. Memory Isolation in Kernel Space",
    status: "pending",
    appliedAt: "2026-08-30T14:20:00Z",
  },
  {
    id: "app-2",
    name: "Soraya Miller",
    email: "soraya@designsystems.io",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    roleApplied: "Contributor (UI Systems & Micro-frontends)",
    portfolioUrl: "https://sorayamiller.dev",
    bio: "Lead Front-End Architect building accessible component primitives and WebAssembly rendering pipelines.",
    sampleTopic: "Sub-millisecond Canvas Rendering with Rust & WebAssembly in Next.js",
    sampleOutline: "1. OffscreenCanvas Workers\n2. WASM Memory Sharing\n3. GPU-Accelerated Layouts",
    status: "pending",
    appliedAt: "2026-08-31T09:45:00Z",
  },
  {
    id: "app-3",
    name: "Alex Vance",
    email: "alex.vance@ai-labs.org",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    roleApplied: "Senior Contributor (AI Infrastructure)",
    portfolioUrl: "https://alexvance.ai",
    bio: "Specializing in multi-agent orchestration frameworks and local LLM quantization on consumer silicon.",
    sampleTopic: "Optimizing BitNet 1.58-bit Weights for Edge Inference",
    sampleOutline: "1. Ternary Quantization\n2. Matrix Multiplications on Edge NPUs\n3. Benchmark Latencies",
    status: "approved",
    appliedAt: "2026-08-20T11:00:00Z",
    reviewedAt: "2026-08-22T16:00:00Z",
    notes: "Outstanding background in quantized model inference. Approved.",
  },
];

const SEED_BADGES: AuthorBadge[] = [
  {
    id: "badge-1",
    badgeCode: "DEV-2026-8821",
    authorId: "auth-1",
    authorName: "Elena Rostova",
    authorHandle: "erostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Staff Infrastructure Engineer",
    specialization: "Distributed Consensus & Edge Storage",
    issueDate: "2026-01-15",
    expiryDate: "2027-01-15",
    verificationUrl: "https://devlog.io/author/auth-1",
  },
  {
    id: "badge-2",
    badgeCode: "DEV-2026-4419",
    authorId: "auth-2",
    authorName: "Marcus Vance",
    authorHandle: "marcusv",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Principal Product Designer & Front-End Architect",
    specialization: "Design Systems & Web Performance",
    issueDate: "2026-02-01",
    expiryDate: "2027-02-01",
    verificationUrl: "https://devlog.io/author/auth-2",
  },
];

const SEED_AUDIT_LOGS: AuditLog[] = [
  {
    id: "audit-1",
    eventType: "newsletter_broadcast",
    recipient: "28,450 Subscribers (Segment: All Active Engineers)",
    subject: "DevLog Edition #42: Zero-Downtime Schema Migrations & Server Actions",
    channel: "email",
    status: "delivered",
    timestamp: "2026-09-01T08:00:00Z",
    payload: {
      message: "Broadcast digest dispatched successfully to all subscribed accounts with open rate 44.2%.",
      metadata: { totalSent: 28450, delivered: 28422, bounces: 28, provider: "Resend / AWS SES" },
    },
  },
  {
    id: "audit-2",
    eventType: "author_onboarded",
    recipient: "alex.vance@ai-labs.org",
    subject: "Welcome to the DevLog Editorial Team — Author Badge Issued",
    channel: "email",
    status: "delivered",
    timestamp: "2026-08-22T16:01:00Z",
    payload: {
      message: "Official author credentials generated with ID DEV-2026-9012.",
      metadata: { authorId: "auth-alex", reviewer: "Admin Elena" },
    },
  },
  {
    id: "audit-3",
    eventType: "article_published",
    recipient: "Global Webhooks (Cloudflare CDN, Discord Dev Community, X/Twitter Bot)",
    subject: "Webhook Alert: 'Mastering Next.js Server Actions' is Live",
    channel: "webhook",
    status: "delivered",
    timestamp: "2026-08-24T14:30:00Z",
    payload: {
      message: "Cache purged at global edge nodes. Webhook dispatched to syndicate channels.",
      metadata: { slug: "mastering-nextjs-server-actions-and-caching", edgePurgeNodes: 180 },
    },
  },
  {
    id: "audit-4",
    eventType: "system_alert",
    recipient: "Security & Operations Team",
    subject: "Automated Daily Database & Catalog Snapshot Completed",
    channel: "system",
    status: "delivered",
    timestamp: "2026-09-01T04:00:00Z",
    payload: {
      message: "All articles, comments, and author badge tables backed up to encrypted storage.",
      metadata: { snapshotSizeBytes: "14.8 MB", status: "VERIFIED_OK" },
    },
  },
];

const SEED_TICKETS: HelpdeskTicket[] = [
  {
    id: "tick-1",
    ticketNumber: "TICK-1042",
    senderName: "Devin Zhao",
    senderEmail: "devin@stripe-eng.com",
    subject: "Typo in PostgreSQL Migration example code in Section 3",
    category: "editorial_correction",
    priority: "medium",
    status: "open",
    createdAt: "2026-08-31T18:30:00Z",
    updatedAt: "2026-08-31T18:30:00Z",
    messages: [
      {
        id: "msg-1",
        sender: "Devin Zhao",
        isStaff: false,
        text: "Hi Editorial Team, in the article on Zero-Downtime PostgreSQL migrations, the code snippet in Step 2 references `orders_user_id_idx` before creating it. Should it be `CREATE INDEX CONCURRENTLY` instead?",
        timestamp: "2026-08-31T18:30:00Z",
      },
    ],
  },
  {
    id: "tick-2",
    ticketNumber: "TICK-1043",
    senderName: "Claire Dupont",
    senderEmail: "partnerships@vercel.com",
    subject: "Sponsorship & Co-Hosted Webinar Proposal for Q4",
    category: "sponsorship",
    priority: "high",
    status: "in_progress",
    createdAt: "2026-08-29T11:15:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    messages: [
      {
        id: "msg-2",
        sender: "Claire Dupont",
        isStaff: false,
        text: "We loved your deep dive on Next.js edge caching. We would love to sponsor the next 3 editions and invite your team as guest panelists.",
        timestamp: "2026-08-29T11:15:00Z",
      },
      {
        id: "msg-3",
        sender: "Admin Elena (DevLog)",
        isStaff: true,
        text: "Hi Claire! Thank you for reaching out. We have sent our editorial sponsorship kit to your email.",
        timestamp: "2026-08-30T10:00:00Z",
      },
    ],
  },
];

// In-browser helper functions
function getStorage<T>(key: string, seed: T): T {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
    } catch {}
  }
  return seed;
}

function setStorage<T>(key: string, data: T) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {}
  }
}

/* =========================================================
   Writer Applications API
========================================================= */

export async function getApplications(): Promise<WriterApplication[]> {
  await new Promise((r) => setTimeout(r, 20));
  return getStorage(APPS_STORAGE_KEY, SEED_APPLICATIONS);
}

export async function approveApplication(id: string, notes?: string): Promise<WriterApplication> {
  await new Promise((r) => setTimeout(r, 50));
  const apps = getStorage(APPS_STORAGE_KEY, SEED_APPLICATIONS);
  const app = apps.find((a) => a.id === id);
  if (!app) throw new Error("Application not found");

  app.status = "approved";
  app.reviewedAt = new Date().toISOString();
  app.notes = notes || "Approved by Editorial Admin.";
  setStorage(APPS_STORAGE_KEY, apps);

  // Auto-generate author badge
  await generateBadge({
    authorName: app.name,
    role: app.roleApplied,
    specialization: app.sampleTopic,
    avatar: app.avatar,
  });

  // Log in outbox
  await createAuditLog({
    eventType: "author_onboarded",
    recipient: app.email,
    subject: `Welcome to the DevLog Editorial Team — ${app.name}`,
    channel: "email",
    status: "delivered",
    payload: {
      message: `Your application has been accepted. Official author badge issued.`,
      metadata: { role: app.roleApplied, notes: app.notes },
    },
  });

  return app;
}

export async function rejectApplication(id: string, reason?: string): Promise<WriterApplication> {
  await new Promise((r) => setTimeout(r, 50));
  const apps = getStorage(APPS_STORAGE_KEY, SEED_APPLICATIONS);
  const app = apps.find((a) => a.id === id);
  if (!app) throw new Error("Application not found");

  app.status = "rejected";
  app.reviewedAt = new Date().toISOString();
  app.notes = reason || "Declined based on current editorial focus.";
  setStorage(APPS_STORAGE_KEY, apps);

  await createAuditLog({
    eventType: "author_onboarded",
    recipient: app.email,
    subject: "Update regarding your DevLog Contributor Application",
    channel: "email",
    status: "delivered",
    payload: {
      message: `Application declined: ${app.notes}`,
      metadata: { applicant: app.name },
    },
  });

  return app;
}

/* =========================================================
   Author Badges API
========================================================= */

export async function getBadges(): Promise<AuthorBadge[]> {
  await new Promise((r) => setTimeout(r, 20));
  return getStorage(BADGES_STORAGE_KEY, SEED_BADGES);
}

export async function generateBadge(params: {
  authorName: string;
  role: string;
  specialization: string;
  avatar: string;
}): Promise<AuthorBadge> {
  await new Promise((r) => setTimeout(r, 40));
  const badges = getStorage(BADGES_STORAGE_KEY, SEED_BADGES);

  const codeNumber = Math.floor(1000 + Math.random() * 9000);
  const newBadge: AuthorBadge = {
    id: `badge-${Date.now()}`,
    badgeCode: `DEV-2026-${codeNumber}`,
    authorId: `auth-${Date.now()}`,
    authorName: params.authorName,
    authorHandle: params.authorName.toLowerCase().replace(/\s+/g, ""),
    avatar: params.avatar,
    role: params.role,
    specialization: params.specialization,
    issueDate: new Date().toISOString().split("T")[0],
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    verificationUrl: `https://devlog.io/author/${params.authorName.toLowerCase().replace(/\s+/g, "")}`,
  };

  badges.unshift(newBadge);
  setStorage(BADGES_STORAGE_KEY, badges);
  return newBadge;
}

/* =========================================================
   Audit Logs API
========================================================= */

export async function getAuditLogs(): Promise<AuditLog[]> {
  await new Promise((r) => setTimeout(r, 20));
  return getStorage(AUDIT_STORAGE_KEY, SEED_AUDIT_LOGS);
}

export async function createAuditLog(entry: Omit<AuditLog, "id" | "timestamp">): Promise<AuditLog> {
  const logs = getStorage(AUDIT_STORAGE_KEY, SEED_AUDIT_LOGS);
  const newLog: AuditLog = {
    ...entry,
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toISOString(),
  };
  logs.unshift(newLog);
  setStorage(AUDIT_STORAGE_KEY, logs);
  return newLog;
}

/* =========================================================
   Helpdesk Tickets API
========================================================= */

export async function getHelpdeskTickets(): Promise<HelpdeskTicket[]> {
  await new Promise((r) => setTimeout(r, 20));
  return getStorage(TICKETS_STORAGE_KEY, SEED_TICKETS);
}

export async function updateTicketStatus(
  id: string,
  status: HelpdeskTicket["status"]
): Promise<HelpdeskTicket> {
  const tickets = getStorage(TICKETS_STORAGE_KEY, SEED_TICKETS);
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) throw new Error("Ticket not found");

  ticket.status = status;
  ticket.updatedAt = new Date().toISOString();
  setStorage(TICKETS_STORAGE_KEY, tickets);
  return ticket;
}

export async function replyToTicket(
  id: string,
  text: string
): Promise<HelpdeskTicket> {
  const tickets = getStorage(TICKETS_STORAGE_KEY, SEED_TICKETS);
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) throw new Error("Ticket not found");

  ticket.messages.push({
    id: `msg-${Date.now()}`,
    sender: "Editorial Admin (DevLog)",
    isStaff: true,
    text,
    timestamp: new Date().toISOString(),
  });
  ticket.updatedAt = new Date().toISOString();
  setStorage(TICKETS_STORAGE_KEY, tickets);

  // Also log into outbox
  await createAuditLog({
    eventType: "system_alert",
    recipient: ticket.senderEmail,
    subject: `Re: [${ticket.ticketNumber}] ${ticket.subject}`,
    channel: "email",
    status: "delivered",
    payload: {
      message: text,
      metadata: { ticketId: ticket.ticketNumber },
    },
  });

  return ticket;
}

/* =========================================================
   Admin Executive KPIs API
========================================================= */

export async function getAdminKPIs(): Promise<AdminKPISummary> {
  const [posts, apps, badges, logs, tickets] = await Promise.all([
    getPosts({ status: "all" }),
    getApplications(),
    getBadges(),
    getAuditLogs(),
    getHelpdeskTickets(),
  ]);

  const totalReaders = posts.reduce((sum, p) => sum + (p.views || 0), 0);
  const pendingApplications = apps.filter((a) => a.status === "pending").length;
  const openTickets = tickets.filter((t) => t.status !== "resolved").length;

  return {
    totalReaders,
    totalArticles: posts.length,
    pendingApplications,
    activeBadges: badges.length,
    outboxDispatches: logs.length,
    openTickets,
  };
}
