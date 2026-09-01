"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  BarChart3,
  Globe,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  User,
} from "lucide-react";
import { ThemeToggle } from "@/components/public/ThemeToggle";
import { getAdminProfile } from "@/lib/api/admin";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [profile, setProfile] = React.useState({
    name: "Khophi",
    role: "Lead Editor & Creator",
    avatar: "/khophi_profile.jpg",
  });

  React.useEffect(() => {
    getAdminProfile().then((p) => {
      if (p) setProfile({ name: p.name, role: p.role, avatar: p.avatar || "/khophi_profile.jpg" });
    });
  }, [pathname]);

  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const links = [
    { label: "Overview & Analytics", href: "/dashboard", icon: LayoutDashboard },
    { label: "Articles & Drafts", href: "/dashboard/posts", icon: FileText },
    { label: "Write Story", href: "/dashboard/posts/new", icon: PenSquare },
    { label: "Audience Growth", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Admin Console", href: "/admin", icon: Sparkles },
    { label: "Profile Settings", href: "/admin/profile", icon: User },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full select-none bg-white dark:bg-[#08214e] text-slate-900 dark:text-white overflow-hidden">
      {/* Brand (Fixed Top) */}
      <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#e2e8f2] dark:border-[#1e3a6a] shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#08214e] text-white shadow-sm border border-amber-400/30">
            <span className="font-mono font-black text-xs text-[#f59e0b]">_k</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-[#08214e] dark:text-white font-heading">
              khophi<span className="text-[#f59e0b] text-xs">_studio</span>
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Navigation Items */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1 scrollbar-thin">
        <nav className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : item.href === "/dashboard/posts"
                ? pathname === "/dashboard/posts"
                : pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#eef3fa] text-[#20509b] dark:bg-[#12346e] dark:text-[#8ab1e3] font-bold shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-[#f7f9fc] dark:text-slate-300 dark:hover:text-white dark:hover:bg-[#12346e]/40"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#f59e0b]" : "text-[#93a0b4]"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Fixed Bottom Footer (Always fully visible, never clipped) */}
      <div className="p-3 sm:p-4 border-t border-[#e2e8f2] dark:border-[#1e3a6a] space-y-2 rounded-t-2xl bg-slate-50 dark:bg-[#041536]/80 shrink-0">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#20509b] dark:text-[#8ab1e3] hover:bg-[#eef3fa] dark:hover:bg-[#12346e] rounded-xl transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#f59e0b]" />
            <span>Public Publication</span>
          </div>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <Link
          href="/admin/profile"
          className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white dark:bg-[#08214e] border border-[#e2e8f2] dark:border-[#1e3a6a] hover:border-amber-400/50 transition-colors group"
          title="Edit Profile"
        >
          <Image
            src={profile.avatar || "/khophi_profile.jpg"}
            alt={profile.name}
            width={32}
            height={32}
            className="rounded-full object-cover ring-1 ring-amber-400 shrink-0 h-8 w-8"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#08214e] dark:text-white group-hover:text-amber-500 transition-colors truncate">
              {profile.name}
            </p>
            <p className="text-[10px] text-[#93a0b4] truncate">{profile.role}</p>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Header (Visible only on < lg screens) */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white dark:bg-[#08214e] border-b border-[#e2e8f2] dark:border-[#1e3a6a] shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#08214e] text-white border border-amber-400/40">
            <span className="font-mono font-black text-xs text-[#f59e0b]">_k</span>
          </div>
          <span className="text-sm font-extrabold font-heading text-[#08214e] dark:text-white">
            khophi<span className="text-[#f59e0b]">_studio</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-[#12346e] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#1e3a6a]"
            aria-label="Open Studio Menu"
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
          <div className="relative w-4/5 max-w-xs bg-white dark:bg-[#08214e] h-full shadow-2xl z-10 border-r border-[#e2e8f2] dark:border-[#1e3a6a] overflow-hidden">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#08214e] border-r border-[#e2e8f2] dark:border-[#1e3a6a] h-screen sticky top-0 z-40 shrink-0 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Main Studio Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
