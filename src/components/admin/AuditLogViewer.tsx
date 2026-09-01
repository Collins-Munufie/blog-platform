"use client";

import * as React from "react";
import { Copy, Check, Send, ShieldCheck, Mail, Globe } from "lucide-react";
import { AuditLog } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

interface AuditLogViewerProps {
  log: AuditLog | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AuditLogViewer({ log, isOpen, onClose }: AuditLogViewerProps) {
  const [copied, setCopied] = React.useState(false);

  if (!log) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(log, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Outbox Notification & Audit Dispatch Record"
      description={`Dispatched at ${formatDate(log.timestamp)}`}
      maxWidth="2xl"
    >
      <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
        {/* Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#f7f9fc] dark:bg-[#08214e] border border-[#e2e8f2] dark:border-[#1e3a6a] text-xs">
          <div>
            <span className="text-[#93a0b4] block text-[10px] uppercase font-bold">Event Type</span>
            <span className="font-bold text-[#08214e] dark:text-white font-mono capitalize">
              {log.eventType.replace("_", " ")}
            </span>
          </div>
          <div>
            <span className="text-[#93a0b4] block text-[10px] uppercase font-bold">Channel</span>
            <span className="font-bold text-[#20509b] dark:text-[#8ab1e3] font-mono uppercase">
              {log.channel}
            </span>
          </div>
          <div>
            <span className="text-[#93a0b4] block text-[10px] uppercase font-bold">Delivery Status</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 capitalize">
              <ShieldCheck className="h-3 w-3" /> {log.status}
            </span>
          </div>
          <div>
            <span className="text-[#93a0b4] block text-[10px] uppercase font-bold">Log ID</span>
            <span className="font-mono text-[11px] text-slate-500 truncate block">{log.id}</span>
          </div>
        </div>

        {/* Recipient & Subject */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-[#e2e8f2] dark:border-[#1e3a6a] space-y-2 text-xs">
          <div>
            <span className="text-[#93a0b4] font-bold">Recipient: </span>
            <span className="font-medium text-[#08214e] dark:text-white">{log.recipient}</span>
          </div>
          <div>
            <span className="text-[#93a0b4] font-bold">Subject / Header: </span>
            <span className="font-medium text-[#08214e] dark:text-white">{log.subject}</span>
          </div>
        </div>

        {/* Payload JSON Inspector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#08214e] dark:text-white">
              Dispatch Payload &amp; Delivery Headers
            </h4>
            <button
              onClick={handleCopy}
              className="text-xs text-[#20509b] dark:text-[#8ab1e3] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy Payload"}
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-[#041536] text-blue-100 font-mono text-xs overflow-x-auto border border-blue-900/50 leading-relaxed max-h-60">
            <code>{JSON.stringify(log.payload, null, 2)}</code>
          </pre>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#e2e8f2] dark:border-[#1e3a6a]">
          <Button onClick={onClose} size="sm" variant="outline">
            Close Inspector
          </Button>
        </div>
      </div>
    </Modal>
  );
}
