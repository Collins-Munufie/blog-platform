"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2, XCircle, ExternalLink, Github, Mail, Clock, FileText } from "lucide-react";
import { WriterApplication } from "@/lib/types";
import { approveApplication, rejectApplication } from "@/lib/api/admin";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

interface ApplicationModalProps {
  application: WriterApplication | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (app: WriterApplication) => void;
}

export function ApplicationModal({
  application,
  isOpen,
  onClose,
  onUpdated,
}: ApplicationModalProps) {
  const [loading, setLoading] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const { toast } = useToast();

  if (!application) return null;

  const handleApprove = async () => {
    setLoading(true);
    try {
      const updated = await approveApplication(application.id, notes);
      onUpdated(updated);
      toast({
        title: "Contributor Approved!",
        description: `${application.name} has been onboarded and an Author Badge has been generated.`,
        type: "success",
      });
      onClose();
    } catch {
      toast({ title: "Approval failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!confirm(`Are you sure you want to decline ${application.name}'s application?`)) {
      return;
    }
    setLoading(true);
    try {
      const updated = await rejectApplication(application.id, notes);
      onUpdated(updated);
      toast({
        title: "Application Declined",
        description: `Notification logged to outbox.`,
        type: "info",
      });
      onClose();
    } catch {
      toast({ title: "Decline failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Writer Contributor Application Dossier"
      description={`Submitted on ${formatDate(application.appliedAt)}`}
      maxWidth="3xl"
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
        {/* Applicant Header Profile */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f7f9fc] dark:bg-[#08214e] border border-[#e2e8f2] dark:border-[#1e3a6a]">
          <Image
            src={application.avatar}
            alt={application.name}
            width={56}
            height={56}
            className="rounded-full object-cover ring-2 ring-[#20509b]"
          />
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#08214e] dark:text-white font-heading">
                {application.name}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                  application.status === "approved"
                    ? "bg-emerald-100 text-emerald-800"
                    : application.status === "rejected"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {application.status}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#20509b] dark:text-[#8ab1e3]">
              Applied for: {application.roleApplied}
            </p>
            <div className="flex items-center gap-4 text-xs text-[#93a0b4] pt-1">
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" /> {application.email}
              </span>
              {application.portfolioUrl && (
                <a
                  href={application.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline text-[#20509b] dark:text-[#8ab1e3]"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Portfolio
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bio Statement */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#08214e] dark:text-white">
            Applicant Background &amp; Bio
          </h4>
          <p className="text-xs text-[#2f3b4d] dark:text-slate-300 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-[#e2e8f2] dark:border-[#1e3a6a] leading-relaxed">
            {application.bio}
          </p>
        </div>

        {/* Proposed Pitch Topic & Outline */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#08214e] dark:text-white flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-[#20509b]" /> Sample Proposed Article Pitch
          </h4>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-[#e2e8f2] dark:border-[#1e3a6a] space-y-2">
            <p className="text-xs font-bold text-[#08214e] dark:text-white">
              {application.sampleTopic}
            </p>
            <pre className="text-xs font-mono text-[#2f3b4d] dark:text-slate-300 whitespace-pre-wrap bg-[#f7f9fc] dark:bg-[#041536] p-3 rounded-lg border border-slate-100 dark:border-slate-800 leading-relaxed">
              {application.sampleOutline}
            </pre>
          </div>
        </div>

        {/* Reviewer Notes input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#08214e] dark:text-white">
            Editorial Reviewer Decision Notes
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add internal review notes or feedback for this candidate..."
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#20509b]"
          />
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f2] dark:border-[#1e3a6a]">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>

          {application.status === "pending" && (
            <div className="flex items-center gap-3">
              <Button
                variant="destructive"
                size="sm"
                isLoading={loading}
                onClick={handleReject}
                className="gap-1.5 text-xs h-9 rounded-xl"
              >
                <XCircle className="h-4 w-4" /> Decline
              </Button>
              <Button
                size="sm"
                isLoading={loading}
                onClick={handleApprove}
                className="gap-1.5 text-xs h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md"
              >
                <CheckCircle2 className="h-4 w-4" /> Approve &amp; Issue ID
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
