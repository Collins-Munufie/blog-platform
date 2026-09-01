"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
  User,
} from "lucide-react";
import { ThemeToggle } from "@/components/public/ThemeToggle";
import { getAdminKPIs, getAdminProfile } from "@/lib/api/admin";
import { AdminKPISummary } from "@/lib/types";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [kpis, setKpis] = React.useState<AdminKPISummary | null>(null);
  const [profile, setProfile] = React.useState({
    name: "Khophi",
    role: "Founder & SuperAdmin",
    avatar: "/khophi_profile.jpg",
  });

  React.useEffect(() => {
    getAdminKPIs().then(setKpis);
    getAdminProfile().then((p) => {
      if (p) setProfile({ name: p.name, role: p.role, avatar: p.avatar || "/khophi_profile.jpg" });
    });
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
    {
      label: "Profile & Author Bio",
      href: "/admin/profile",
      icon: User,
    },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full select-none text-white overflow-hidden bg-[#041536]">
      {/* Brand Header (Fixed Top) */}
      <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#12346e] shrink-0">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#08214e] text-white shadow-md border border-amber-400/40 group-hover:scale-105 transition-transform">
            <span className="font-mono font-black text-xs text-[#f59e0b]">_k</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-extrabold tracking-tight font-heading text-white truncate">
              khophi<span className="text-[#f59e0b]">_admin</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#8ab1e3]">
              Publication Suite
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Navigation List (Scrolls in the middle, never pushes footer offscreen) */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1 scrollbar-thin">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6394d6] px-3 mb-2 pt-1">
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
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#20509b] text-white font-bold shadow-md border border-blue-400/30"
                    : "text-blue-100/80 hover:text-white hover:bg-[#08214e]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#f59e0b]" : "text-[#8ab1e3]"}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${
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

      {/* Fixed Bottom Footer (Always fully visible, never clipped) */}
      <div className="p-3 sm:p-4 border-t border-[#12346e] space-y-2 bg-[#08214e]/60 shrink-0">
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

        <Link
          href="/admin/profile"
          className="flex items-center gap-3 p-2 rounded-xl bg-[#041536] border border-[#12346e] hover:border-amber-400/50 transition-colors group"
          title="Edit Admin Profile"
        >
          <Image
            src={profile.avatar || "/khophi_profile.jpg"}
            alt={profile.name}
            width={32}
            height={32}
            className="rounded-full object-cover ring-1 ring-amber-400 shrink-0 h-8 w-8"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
              {profile.name}
            </p>
            <p className="text-[10px] text-[#8ab1e3] font-mono truncate">{profile.role}</p>
          </div>
        </Link>
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
          <div className="relative w-4/5 max-w-xs bg-[#041536] h-full shadow-2xl z-10 border-r border-[#12346e] overflow-hidden">
            <NavContent />
          </div>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-[#041536] border-r border-[#12346e] h-screen sticky top-0 z-40 shrink-0 overflow-hidden">
        <NavContent />
      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
