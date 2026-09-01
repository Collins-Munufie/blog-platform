import Link from "next/link";
import {
  Users,
  Award,
  Send,
  LifeBuoy,
  FileText,
  Eye,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  getAdminKPIs,
  getApplications,
  getAuditLogs,
  getHelpdeskTickets,
} from "@/lib/api/admin";
import { formatCompactNumber, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AdminCommandCenterPage() {
  const [kpis, applications, auditLogs, tickets] = await Promise.all([
    getAdminKPIs(),
    getApplications(),
    getAuditLogs(),
    getHelpdeskTickets(),
  ]);

  const pendingApps = applications.filter((a) => a.status === "pending").slice(0, 3);
  const recentLogs = auditLogs.slice(0, 4);
  const openTickets = tickets.filter((t) => t.status !== "resolved").slice(0, 3);

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Administrative Command Center"
        description="Centralized governance over writer onboarding, author identity, outbox communications, and platform health."
      />

      {/* Top 6 KPI Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Cumulative Reads */}
        <div className="card-lift p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[#93a0b4]">
            <span className="text-[11px] font-bold uppercase">Total Readers</span>
            <Eye className="h-4 w-4 text-[#20509b]" />
          </div>
          <p className="text-2xl font-black font-heading text-[#08214e] dark:text-white">
            {formatCompactNumber(kpis.totalReaders)}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Live metric
          </span>
        </div>

        {/* Catalog Size */}
        <div className="card-lift p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[#93a0b4]">
            <span className="text-[11px] font-bold uppercase">Articles</span>
            <FileText className="h-4 w-4 text-[#20509b]" />
          </div>
          <p className="text-2xl font-black font-heading text-[#08214e] dark:text-white">
            {kpis.totalArticles}
          </p>
          <span className="text-[10px] text-[#93a0b4]">In active catalog</span>
        </div>

        {/* Writer Applications */}
        <div className="card-lift p-4 rounded-2xl space-y-2 border-amber-300 dark:border-amber-900/50 bg-amber-50/20">
          <div className="flex items-center justify-between text-[#93a0b4]">
            <span className="text-[11px] font-bold uppercase text-amber-700 dark:text-amber-400">
              Applications
            </span>
            <Users className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black font-heading text-[#08214e] dark:text-white">
            {kpis.pendingApplications}
          </p>
          <span className="text-[10px] text-amber-600 font-bold">
            {kpis.pendingApplications > 0 ? "Awaiting review" : "All reviewed"}
          </span>
        </div>

        {/* Active Author Badges */}
        <div className="card-lift p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[#93a0b4]">
            <span className="text-[11px] font-bold uppercase">Issued Badges</span>
            <Award className="h-4 w-4 text-[#f4ae17]" />
          </div>
          <p className="text-2xl font-black font-heading text-[#08214e] dark:text-white">
            {kpis.activeBadges}
          </p>
          <span className="text-[10px] text-slate-500">Verified IDs</span>
        </div>

        {/* Outbox Dispatches */}
        <div className="card-lift p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[#93a0b4]">
            <span className="text-[11px] font-bold uppercase">Outbox Logs</span>
            <Send className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black font-heading text-[#08214e] dark:text-white">
            {kpis.outboxDispatches}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">100% delivered</span>
        </div>

        {/* Open Helpdesk Tickets */}
        <div className="card-lift p-4 rounded-2xl space-y-2 border-rose-300 dark:border-rose-900/50 bg-rose-50/20">
          <div className="flex items-center justify-between text-[#93a0b4]">
            <span className="text-[11px] font-bold uppercase text-rose-700 dark:text-rose-400">
              Helpdesk
            </span>
            <LifeBuoy className="h-4 w-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black font-heading text-[#08214e] dark:text-white">
            {kpis.openTickets}
          </p>
          <span className="text-[10px] text-rose-600 font-bold">
            {kpis.openTickets > 0 ? "Pending resolution" : "Inbox cleared"}
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Pending Applications Queue & Support Inquiries */}
        <div className="lg:col-span-7 space-y-8">
          {/* Applications Queue */}
          <div className="card-lift p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#08214e] dark:text-white font-heading">
                  Pending Writer Applications
                </h3>
                <p className="text-xs text-[#93a0b4]">Candidates awaiting editorial vetting</p>
              </div>
              <Link
                href="/admin/applications"
                className="text-xs font-bold text-[#20509b] dark:text-[#8ab1e3] hover:underline flex items-center gap-1"
              >
                View all ({applications.length}) <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              {pendingApps.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">
                  No pending writer applications right now.
                </p>
              ) : (
                pendingApps.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl bg-[#f7f9fc] dark:bg-[#08214e]/60 border border-[#e2e8f2] dark:border-[#1e3a6a] flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#08214e] dark:text-white truncate">
                          {app.name}
                        </span>
                        <span className="text-[10px] font-semibold text-[#f4ae17] bg-[#fff9eb] dark:bg-[#f4ae17]/10 px-2 py-0.2 rounded-full">
                          {app.roleApplied}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#2f3b4d] dark:text-slate-300 line-clamp-1">
                        Pitch: {app.sampleTopic}
                      </p>
                      <p className="text-[10px] text-[#93a0b4]">
                        Applied {formatDate(app.appliedAt)}
                      </p>
                    </div>

                    <Link href="/admin/applications">
                      <Button size="sm" className="text-xs h-8 px-3 rounded-xl bg-[#20509b]">
                        Review
                      </Button>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Helpdesk Inquiries Highlight */}
          <div className="card-lift p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#08214e] dark:text-white font-heading">
                  Active Editorial Helpdesk Inquiries
                </h3>
                <p className="text-xs text-[#93a0b4]">Corrections &amp; sponsorship communications</p>
              </div>
              <Link
                href="/admin/helpdesk"
                className="text-xs font-bold text-[#20509b] dark:text-[#8ab1e3] hover:underline flex items-center gap-1"
              >
                Helpdesk Console <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              {openTickets.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl bg-[#f7f9fc] dark:bg-[#08214e]/60 border border-[#e2e8f2] dark:border-[#1e3a6a] flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#20509b] dark:text-[#8ab1e3]">
                        {t.ticketNumber}
                      </span>
                      <span className="font-bold text-xs text-[#08214e] dark:text-white truncate">
                        {t.subject}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#93a0b4]">
                      From {t.senderName} ({t.senderEmail})
                    </p>
                  </div>
                  <Link href="/admin/helpdesk">
                    <Button size="sm" variant="outline" className="text-xs h-8 px-3 rounded-xl">
                      Reply
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Outbox Notification Logs Stream & Quick Actions */}
        <div className="lg:col-span-5 space-y-8">
          {/* Outbox Notifications Stream */}
          <div className="card-lift p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#08214e] dark:text-white font-heading">
                  System Outbox Audit Log
                </h3>
                <p className="text-xs text-[#93a0b4]">Automated notifications &amp; dispatches</p>
              </div>
              <Link
                href="/admin/outbox"
                className="text-xs font-bold text-[#20509b] dark:text-[#8ab1e3] hover:underline flex items-center gap-1"
              >
                Full Outbox <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#041536] border border-[#e2e8f2] dark:border-[#1e3a6a] space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#20509b] dark:text-[#8ab1e3] uppercase">
                      [{log.channel}] {log.eventType.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> {log.status}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                    {log.subject}
                  </p>
                  <p className="text-[10px] text-[#93a0b4] truncate">
                    To: {log.recipient} • {formatDate(log.timestamp)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Administrative Shortcuts */}
          <div className="p-6 rounded-3xl brand-atmosphere text-white space-y-4 shadow-xl border border-blue-400/20">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#fdc035]" />
              <h3 className="text-base font-bold font-heading">Quick Actions</h3>
            </div>
            <p className="text-xs text-blue-100/90 leading-relaxed">
              Instantly issue verified author passes, publish articles, or manage taxonomy tags.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link href="/admin/badges">
                <Button size="sm" className="w-full bg-white text-[#08214e] hover:bg-[#fff9eb] font-bold text-xs h-9 rounded-xl">
                  Issue Author ID
                </Button>
              </Link>
              <Link href="/admin/posts">
                <Button size="sm" className="w-full glass-pill text-white hover:bg-white/20 font-bold text-xs h-9 rounded-xl">
                  Moderate Catalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
