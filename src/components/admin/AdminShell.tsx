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
  ArrowRight,
  LayoutDashboard,
  Image as ImageIcon,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/public/ThemeToggle";
import { getAdminKPIs } from "@/lib/api/admin";
import { AdminKPISummary } from "@/lib/types";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [kpis, setKpis] = React.useState<AdminKPISummary | null>(null);

  React.useEffect(() => {
    getAdminKPIs().then(setKpis);
  }, [pathname]);

  // Close mobile drawer on route change
  React.useEffect(() => {
    setIsMobileOpen(false);
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

  const NavContent = () => (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5 select-none text-white">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#12346e]">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#08214e] text-white shadow-lg border border-amber-400/40 group-hover:scale-105 transition-transform">
              <span className="font-mono font-black text-sm text-[#f59e0b]">_k</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base font-extrabold tracking-tight font-heading text-white truncate">
                khophi<span className="text-[#f59e0b]">_admin</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#8ab1e3]">
                Ghana Governance Suite
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Close Button on Mobile */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation List */}
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

      {/* Footer / Switch to public site */}
      <div className="p-3 sm:p-4 border-t border-[#12346e] space-y-2 bg-[#08214e]/40 rounded-2xl mt-4">
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
            <p className="text-xs font-bold text-white truncate">Khophi</p>
            <p className="text-[10px] text-[#8ab1e3] font-mono truncate">Founder &amp; SuperAdmin</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc] dark:bg-[#041536] text-[#08214e] dark:text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Header (Visible only on < lg screens) */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-[#041536] text-white border-b border-[#12346e] shadow-md">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#08214e] text-white border border-amber-400/40">
            <span className="font-mono font-black text-xs text-[#f59e0b]">_k</span>
          </div>
          <span className="text-sm font-extrabold font-heading text-white">
            khophi<span className="text-[#f59e0b]">_admin</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-lg bg-[#08214e] text-slate-200 hover:text-white border border-[#12346e]"
            aria-label="Open Admin Menu"
          >
            <Menu className="h-5 w-5 text-[#f59e0b]" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-over Drawer Backdrop & Panel */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#041536] h-full shadow-2xl z-10 border-r border-[#12346e] overflow-y-auto">
            <NavContent />
          </div>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-[#041536] border-r border-[#12346e] h-screen sticky top-0 z-40 shrink-0">
        <NavContent />
      </aside>

      {/* Main Admin Content Container with Responsive Padding */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
