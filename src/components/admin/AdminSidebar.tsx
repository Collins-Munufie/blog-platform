"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldAlert,
  Users,
  Award,
  Send,
  LifeBuoy,
  FileText,
  Layers,
  Globe,
  Settings,
  ArrowRight,
  LayoutDashboard,
  Image as ImageIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/public/ThemeToggle";
import { getAdminKPIs } from "@/lib/api/admin";
import { logoutAdmin } from "@/lib/api/auth";
import { AdminKPISummary } from "@/lib/types";

export function AdminSidebar() {
  const pathname = usePathname();
  const [kpis, setKpis] = React.useState<AdminKPISummary | null>(null);

  React.useEffect(() => {
    getAdminKPIs().then(setKpis);
  }, [pathname]);

  const navItems = [
    {
      label: "Command Overview",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Writer Applications",
      href: "/admin/applications",
      icon: Users,
      badge: kpis?.pendingApplications ? `${kpis.pendingApplications} new` : undefined,
      badgeColor: "bg-amber-400 text-slate-950",
    },
    {
      label: "Author ID Badges",
      href: "/admin/badges",
      icon: Award,
      badge: kpis?.activeBadges ? `${kpis.activeBadges}` : undefined,
    },
    {
      label: "Media Library",
      href: "/admin/media",
      icon: ImageIcon,
    },
    {
      label: "Outbox Audit Logs",
      href: "/admin/outbox",
      icon: Send,
      badge: kpis?.outboxDispatches ? `${kpis.outboxDispatches}` : undefined,
    },
    {
      label: "Editorial Helpdesk",
      href: "/admin/helpdesk",
      icon: LifeBuoy,
      badge: kpis?.openTickets ? `${kpis.openTickets} open` : undefined,
      badgeColor: "bg-rose-500 text-white",
    },
    {
      label: "Catalog Governance",
      href: "/admin/posts",
      icon: FileText,
    },
    {
      label: "Taxonomy & Tracks",
      href: "/admin/categories",
      icon: Layers,
    },
  ];

  return (
    <aside className="w-72 bg-[#041536] text-white border-r border-[#12346e] flex flex-col justify-between h-screen sticky top-0 transition-colors z-40 select-none">
      <div className="p-5 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#12346e]">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#08214e] text-white shadow-lg border border-amber-400/40 group-hover:scale-105 transition-transform">
              <span className="font-mono font-black text-sm text-[#f59e0b]">_k</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight font-heading text-white">
                khophi<span className="text-[#f59e0b]">_admin</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8ab1e3]">
                Ghana Governance Suite
              </span>
            </div>
          </Link>
          <ThemeToggle />
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6394d6] px-3 mb-2">
            Administration Modules
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#20509b] text-white font-bold shadow-md shadow-blue-950/40 border border-blue-400/30"
                      : "text-blue-100/80 hover:text-white hover:bg-[#08214e]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? "text-[#f59e0b]" : "text-[#8ab1e3]"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.badgeColor || "bg-[#12346e] text-blue-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-[#12346e] space-y-2 bg-[#08214e]/40">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#8ab1e3] hover:text-white hover:bg-[#12346e] rounded-xl transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#f59e0b]" />
            <span>Public Publication</span>
          </div>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#041536] border border-[#12346e]">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-[#041536] text-[11px] font-black shrink-0">
            K
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate flex items-center gap-1">
              <span>Khophi</span>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold">🔒 Admin</span>
            </p>
            <button
              type="button"
              onClick={() => logoutAdmin()}
              className="text-[10px] text-rose-400 hover:underline font-bold"
            >
              Lock Admin Console
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
