"use client";

import * as React from "react";
import { Send, CheckCircle2, Clock, LifeBuoy, X, AlertCircle } from "lucide-react";
import { HelpdeskTicket, TicketStatus } from "@/lib/types";
import { replyToTicket, updateTicketStatus } from "@/lib/api/admin";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

interface TicketDrawerProps {
  ticket: HelpdeskTicket | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (ticket: HelpdeskTicket) => void;
}

export function TicketDrawer({
  ticket,
  isOpen,
  onClose,
  onUpdated,
}: TicketDrawerProps) {
  const [replyText, setReplyText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  if (!isOpen || !ticket) return null;

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setLoading(true);
    try {
      const updated = await replyToTicket(ticket.id, replyText.trim());
      onUpdated(updated);
      setReplyText("");
      toast({
        title: "Reply Dispatched!",
        description: `Notification sent to ${ticket.senderEmail} and logged to Outbox.`,
        type: "success",
      });
    } catch {
      toast({ title: "Failed to send reply", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: TicketStatus) => {
    try {
      const updated = await updateTicketStatus(ticket.id, status);
      onUpdated(updated);
      toast({
        title: "Ticket Status Updated",
        description: `Marked as ${status}.`,
        type: "info",
      });
    } catch {
      toast({ title: "Failed to update status", type: "error" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#08214e] border-l border-[#e2e8f2] dark:border-[#1e3a6a] shadow-2xl z-10 flex flex-col h-full animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#e2e8f2] dark:border-[#1e3a6a] flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#20509b] dark:text-[#8ab1e3]">
                {ticket.ticketNumber}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  ticket.priority === "high"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {ticket.priority} priority
              </span>
            </div>
            <h3 className="text-base font-bold text-[#08214e] dark:text-white font-heading">
              {ticket.subject}
            </h3>
            <p className="text-xs text-[#93a0b4]">
              From: {ticket.senderName} ({ticket.senderEmail})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Status Action Toolbar */}
        <div className="px-6 py-3 bg-[#f7f9fc] dark:bg-[#041536] border-b border-[#e2e8f2] dark:border-[#1e3a6a] flex items-center justify-between text-xs">
          <span className="text-[#93a0b4] font-bold">Status:</span>
          <div className="flex items-center gap-1.5">
            {(["open", "in_progress", "resolved"] as const).map((st) => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`px-2.5 py-1 rounded-lg capitalize font-semibold transition-all ${
                  ticket.status === st
                    ? "bg-[#20509b] text-white shadow-sm font-bold"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                }`}
              >
                {st.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {ticket.messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-2xl space-y-1.5 ${
                msg.isStaff
                  ? "bg-[#eef3fa] dark:bg-[#12346e]/60 border border-[#b9d2f0] dark:border-[#1e3a6a] ml-6"
                  : "bg-white dark:bg-slate-900 border border-[#e2e8f2] dark:border-[#1e3a6a] mr-6"
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#08214e] dark:text-white">
                  {msg.sender}
                </span>
                <span className="text-[10px] text-[#93a0b4] font-mono">
                  {formatDate(msg.timestamp)}
                </span>
              </div>
              <p className="text-xs text-[#2f3b4d] dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        {/* Response Composer */}
        <form
          onSubmit={handleSendReply}
          className="p-4 border-t border-[#e2e8f2] dark:border-[#1e3a6a] bg-white dark:bg-[#08214e] space-y-3"
        >
          <textarea
            required
            rows={3}
            placeholder="Compose official editorial response..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#20509b]"
          />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#93a0b4]">
              Dispatches directly to sender email &amp; logs to outbox.
            </span>
            <Button
              type="submit"
              size="sm"
              isLoading={loading}
              className="gap-1.5 bg-[#20509b] hover:bg-[#12346e] text-white rounded-xl shadow-md text-xs font-semibold"
            >
              <Send className="h-3.5 w-3.5" /> Send Response
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
