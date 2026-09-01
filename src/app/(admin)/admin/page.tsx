import Link from "next/link";
import {
  Users,
  Award,
  Send,
  LifeBuoy,
  FileText,
  Eye,
  ArrowRight,
  Sparkles,
  PenSquare,
  CheckCircle,
} from "lucide-react";
import { getAdminKPIs, getApplications, getHelpdeskTickets } from "@/lib/api/admin";
import { getPosts } from "@/lib/api/posts";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/Button";
import { formatCompactNumber, formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const [kpis, allApps, allTickets, allPosts] = await Promise.all([
    getAdminKPIs(),
    getApplications(),
    getHelpdeskTickets(),
    getPosts({ status: "all" }),
  ]);

  const pendingApps = allApps.filter((a) => a.status === "pending");
  const openTickets = allTickets.filter((t) => t.status === "open");

  const kpiCards = [
    { label: "Total Readers", value: formatCompactNumber(kpis.totalReaders), icon: Eye, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40" },
    { label: "Published Stories", value: kpis.totalArticles.toString(), icon: FileText, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { label: "Writer Applications", value: kpis.pendingApplications.toString(), icon: Users, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40" },
    { label: "Author Badges", value: kpis.activeBadges.toString(), icon: Award, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
    { label: "Outbox Dispatches", value: kpis.outboxDispatches.toString(), icon: Send, color: "text-sky-600 bg-sky-50 dark:bg-sky-950/40" },
    { label: "Open Inquiries", value: kpis.openTickets.toString(), icon: LifeBuoy, color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40" },
  ];

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Admin Overview"
        description="Review incoming writer applications, manage badges, and answer reader inquiries."
        action={
          <div className="flex items-center gap-2">
            <Link href="/admin/applications">
              <Button variant="outline" size="sm" className="rounded-xl text-xs">
                Review Applications
              </Button>
            </Link>
            <Link href="/dashboard/posts/new">
              <Button size="sm" className="rounded-xl text-xs bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900">
                <PenSquare className="h-3.5 w-3.5 mr-1" />
                New Post
              </Button>
            </Link>
          </div>
        }
      />

      {/* 1. Simple, Clean Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="p-4 rounded-2xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-2 shadow-sm"
            >
              <div className={`p-2 rounded-xl w-fit ${card.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 font-heading">
                  {card.value}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {card.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Pending Tasks: Writer Applications & Reader Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Applications */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
                Pending Writer Applications
              </h3>
              <p className="text-xs text-stone-500">
                {pendingApps.length} writer{pendingApps.length === 1 ? "" : "s"} waiting for review
              </p>
            </div>
            <Link
              href="/admin/applications"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {pendingApps.length === 0 ? (
              <p className="py-6 text-xs text-stone-400 text-center">No pending applications.</p>
            ) : (
              pendingApps.slice(0, 3).map((app) => (
                <div key={app.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      {app.name}
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">
                      {app.sampleTopic} • {app.email}
                    </p>
                  </div>
                  <Link href="/admin/applications">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/50 hover:text-amber-700 transition-colors">
                      Review
                    </span>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Reader Inquiries */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
                Reader Messages &amp; Inquiries
              </h3>
              <p className="text-xs text-stone-500">
                {openTickets.length} open message{openTickets.length === 1 ? "" : "s"}
              </p>
            </div>
            <Link
              href="/admin/helpdesk"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              Open inbox <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {openTickets.length === 0 ? (
              <p className="py-6 text-xs text-stone-400 text-center">Inbox is all clear!</p>
            ) : (
              openTickets.slice(0, 3).map((ticket) => (
                <div key={ticket.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      {ticket.subject}
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">
                      From {ticket.senderName} ({ticket.senderEmail})
                    </p>
                  </div>
                  <Link href="/admin/helpdesk">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors">
                      Reply
                    </span>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
