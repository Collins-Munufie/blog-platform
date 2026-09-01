"use client";

import * as React from "react";
import { LifeBuoy, Search, MessageSquare, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { HelpdeskTicket, TicketStatus } from "@/lib/types";
import { getHelpdeskTickets } from "@/lib/api/admin";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TicketDrawer } from "@/components/admin/TicketDrawer";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function HelpdeskPage() {
  const [tickets, setTickets] = React.useState<HelpdeskTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = React.useState<HelpdeskTicket | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"all" | TicketStatus>("open");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    getHelpdeskTickets().then(setTickets);
  }, []);

  const handleOpenDrawer = (ticket: HelpdeskTicket) => {
    setSelectedTicket(ticket);
    setIsDrawerOpen(true);
  };

  const handleUpdated = (updated: HelpdeskTicket) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    setSelectedTicket(updated);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesTab = activeTab === "all" ? true : ticket.status === activeTab;
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Editorial Helpdesk &amp; Reader Support"
        description="Manage article correction requests, technical inquiries, and sponsorship communications."
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl w-fit border border-slate-200 dark:border-slate-800">
          {(["open", "in_progress", "resolved", "all"] as const).map((tab) => {
            const count =
              tab === "all"
                ? tickets.length
                : tickets.filter((t) => t.status === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-[#20509b] text-white shadow-sm font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.replace("_", " ")} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets, subject, sender..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20509b] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Tickets Table */}
      <div className="overflow-hidden card-lift rounded-3xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#e2e8f2] bg-[#f7f9fc] dark:border-[#1e3a6a] dark:bg-[#08214e] text-[#93a0b4] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Ticket ID &amp; Subject</th>
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f2] dark:divide-[#1e3a6a] text-[#2f3b4d] dark:text-slate-200">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#93a0b4]">
                    No tickets found under this status.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4 max-w-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#20509b] dark:text-[#8ab1e3]">
                          {t.ticketNumber}
                        </span>
                      </div>
                      <p className="font-semibold text-[#08214e] dark:text-white truncate mt-0.5">
                        {t.subject}
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-semibold text-[#08214e] dark:text-white">{t.senderName}</p>
                      <p className="text-[11px] text-[#93a0b4]">{t.senderEmail}</p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      <span className="px-2.5 py-1 rounded-lg bg-[#eef3fa] dark:bg-[#12346e] text-[#20509b] dark:text-[#8ab1e3] text-[11px] font-bold">
                        {t.category.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          t.priority === "high"
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                        }`}
                      >
                        {t.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap capitalize font-medium">
                      <span
                        className={`inline-flex items-center gap-1 ${
                          t.status === "resolved"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : t.status === "in_progress"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {t.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        size="sm"
                        onClick={() => handleOpenDrawer(t)}
                        className="text-xs h-7 px-3 rounded-lg bg-[#20509b] text-white"
                      >
                        Open Thread ({t.messages.length})
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Drawer */}
      <TicketDrawer
        ticket={selectedTicket}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpdated={handleUpdated}
      />
    </div>
  );
}
