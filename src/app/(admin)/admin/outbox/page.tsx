"use client";

import * as React from "react";
import { Send, ShieldCheck, Mail, Globe, Search, Filter, Sparkles } from "lucide-react";
import { AuditLog, AuditChannel } from "@/lib/types";
import { getAuditLogs, createAuditLog } from "@/lib/api/admin";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AuditLogViewer } from "@/components/admin/AuditLogViewer";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export default function OutboxPage() {
  const [logs, setLogs] = React.useState<AuditLog[]>([]);
  const [selectedLog, setSelectedLog] = React.useState<AuditLog | null>(null);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [activeChannel, setActiveChannel] = React.useState<"all" | AuditChannel>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const { toast } = useToast();

  React.useEffect(() => {
    getAuditLogs().then(setLogs);
  }, []);

  const handleInspect = (log: AuditLog) => {
    setSelectedLog(log);
    setIsViewerOpen(true);
  };

  const handleBroadcastNewsletter = async () => {
    try {
      const newLog = await createAuditLog({
        eventType: "newsletter_broadcast",
        recipient: "28,450 Verified Subscribers",
        subject: `Weekly Deep-Dive: Distributed Key-Value Stores Edition`,
        channel: "email",
        status: "delivered",
        payload: {
          message: "Weekly architectural digest successfully dispatched via Resend cluster.",
          metadata: { totalSent: 28450, delivered: 28430, openRateEstimate: "42.8%" },
        },
      });
      setLogs((prev) => [newLog, ...prev]);
      toast({
        title: "Broadcast Dispatched!",
        description: "Newsletter broadcast sent to 28,450 subscribers.",
        type: "success",
      });
    } catch {
      toast({ title: "Broadcast failed", type: "error" });
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesChannel = activeChannel === "all" ? true : log.channel === activeChannel;
    const matchesSearch =
      log.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.eventType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Outbox Notification &amp; Audit Logs"
        description="Immutable audit trail of all emails, newsletter broadcasts, webhooks, and security notifications."
        action={
          <Button
            size="sm"
            onClick={handleBroadcastNewsletter}
            className="gap-2 bg-[#20509b] text-white rounded-xl text-xs h-9 font-semibold"
          >
            <Send className="h-4 w-4" /> Trigger Weekly Broadcast
          </Button>
        }
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Channel Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl w-fit border border-slate-200 dark:border-slate-800">
          {(["all", "email", "webhook", "system"] as const).map((channel) => (
            <button
              key={channel}
              onClick={() => setActiveChannel(channel)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeChannel === channel
                  ? "bg-[#20509b] text-white shadow-sm font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {channel} (
              {
                channel === "all"
                  ? logs.length
                  : logs.filter((l) => l.channel === channel).length
              }
              )
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search outbox records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20509b] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Outbox Table */}
      <div className="overflow-hidden card-lift rounded-3xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e2e8f2] bg-[#f7f9fc] dark:border-[#1e3a6a] dark:bg-[#08214e] text-[#93a0b4] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Event Type &amp; Channel</th>
                <th className="px-6 py-4">Recipient</th>
                <th className="px-6 py-4">Subject &amp; Message Header</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f2] dark:divide-[#1e3a6a] text-[#2f3b4d] dark:text-slate-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#93a0b4]">
                    No outbox logs match this filter.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#eef3fa] dark:bg-[#12346e] text-[#20509b] dark:text-[#8ab1e3] uppercase">
                          {log.channel}
                        </span>
                        <span className="font-bold text-[#08214e] dark:text-white capitalize">
                          {log.eventType.replace("_", " ")}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate font-medium">
                      {log.recipient}
                    </td>

                    <td className="px-6 py-4 max-w-sm">
                      <p className="font-semibold text-[#08214e] dark:text-white truncate">
                        {log.subject}
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 capitalize">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {log.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-[#93a0b4] font-mono text-[11px]">
                      {formatDate(log.timestamp)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleInspect(log)}
                        className="text-xs h-7 px-2.5 rounded-lg border-[#b9d2f0] text-[#20509b] dark:text-white dark:border-[#1e3a6a]"
                      >
                        Inspect Payload
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Modal */}
      <AuditLogViewer
        log={selectedLog}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </div>
  );
}
