"use client";

import * as React from "react";
import Link from "next/link";
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
} from "lucide-react";
import { ThemeToggle } from "@/components/public/ThemeToggle";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const links = [
    { label: "Overview & Analytics", href: "/dashboard", icon: LayoutDashboard },
    { label: "Articles & Drafts", href: "/dashboard/posts", icon: FileText },
    { label: "Write Story", href: "/dashboard/posts/new", icon: PenSquare },
    { label: "Audience Growth", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Admin Console", href: "/admin", icon: Sparkles },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5 select-none bg-white dark:bg-[#08214e] text-slate-900 dark:text-white">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f2] dark:border-[#1e3a6a]">
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
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#eef3fa] text-[#20509b] dark:bg-[#12346e] dark:text-[#8ab1e3] font-bold shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-[#f7f9fc] dark:text-slate-300 dark:hover:text-white dark:hover:bg-[#12346e]/40"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-[#f59e0b]" : "text-[#93a0b4]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Switch to public site */}
      <div className="p-3 sm:p-4 border-t border-[#e2e8f2] dark:border-[#1e3a6a] space-y-2 rounded-2xl bg-slate-50 dark:bg-[#041536]/80 mt-4">
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

        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white dark:bg-[#08214e] border border-[#e2e8f2] dark:border-[#1e3a6a]">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-[#041536] text-[11px] font-black shrink-0">
            K
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#08214e] dark:text-white truncate">
              Khophi
            </p>
            <p className="text-[10px] text-[#93a0b4] truncate">Lead Editor &amp; Creator</p>
          </div>
        </div>
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
          <div className="relative w-4/5 max-w-xs bg-white dark:bg-[#08214e] h-full shadow-2xl z-10 border-r border-[#e2e8f2] dark:border-[#1e3a6a] overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#08214e] border-r border-[#e2e8f2] dark:border-[#1e3a6a] h-screen sticky top-0 z-40 shrink-0">
        <SidebarContent />
      </aside>

      {/* Main Studio Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
