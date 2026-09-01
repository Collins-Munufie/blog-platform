"use client";

import * as React from "react";
import Image from "next/image";
import { Users, Search, CheckCircle2, XCircle, Clock, ExternalLink, Filter } from "lucide-react";
import { WriterApplication, ApplicationStatus } from "@/lib/types";
import { getApplications } from "@/lib/api/admin";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ApplicationModal } from "@/components/admin/ApplicationModal";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function ApplicationsPage() {
  const [applications, setApplications] = React.useState<WriterApplication[]>([]);
  const [selectedApp, setSelectedApp] = React.useState<WriterApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"all" | ApplicationStatus>("pending");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    getApplications().then(setApplications);
  }, []);

  const handleOpenModal = (app: WriterApplication) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const handleUpdated = (updated: WriterApplication) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  const filteredApps = applications.filter((app) => {
    const matchesTab = activeTab === "all" ? true : app.status === activeTab;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.roleApplied.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.sampleTopic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Writer &amp; Contributor Applications"
        description="Vet technical domain expertise, review proposed article pitches, and issue author badges."
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl w-fit border border-slate-200 dark:border-slate-800">
          {(["pending", "approved", "rejected", "all"] as const).map((tab) => {
            const count =
              tab === "all"
                ? applications.length
                : applications.filter((a) => a.status === tab).length;

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
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search applicants, roles, pitches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20509b] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Applications Grid */}
      {filteredApps.length === 0 ? (
        <div className="card-lift p-12 text-center rounded-3xl space-y-2">
          <Users className="h-10 w-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-[#08214e] dark:text-white">
            No applications match this filter
          </p>
          <p className="text-xs text-[#93a0b4]">Try switching the status tabs or clearing search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="card-lift p-6 rounded-3xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={app.avatar}
                      alt={app.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover ring-2 ring-[#20509b]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#08214e] dark:text-white font-heading">
                        {app.name}
                      </h4>
                      <p className="text-[11px] text-[#93a0b4]">{app.email}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      app.status === "approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : app.status === "rejected"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                {/* Role & Pitch */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#20509b] dark:text-[#8ab1e3]">
                    {app.roleApplied}
                  </span>
                  <p className="text-xs text-[#2f3b4d] dark:text-slate-300 line-clamp-2">
                    <span className="font-semibold text-slate-900 dark:text-white">Pitch: </span>
                    {app.sampleTopic}
                  </p>
                </div>
              </div>

              {/* Footer / CTA */}
              <div className="pt-3 border-t border-[#e2e8f2] dark:border-[#1e3a6a] flex items-center justify-between text-xs">
                <span className="text-[10px] text-[#93a0b4]">
                  Applied {formatDate(app.appliedAt)}
                </span>
                <Button
                  size="sm"
                  onClick={() => handleOpenModal(app)}
                  className="text-xs h-8 px-3 rounded-xl bg-[#20509b] hover:bg-[#12346e] text-white"
                >
                  Review Dossier
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Review Modal */}
      <ApplicationModal
        application={selectedApp}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdated={handleUpdated}
      />
    </div>
  );
}
