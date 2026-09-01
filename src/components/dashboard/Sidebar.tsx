"use client";

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
  Image as ImageIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/public/ThemeToggle";

export function DashboardSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Overview & Analytics", href: "/dashboard", icon: LayoutDashboard },
    { label: "Articles & Drafts", href: "/dashboard/posts", icon: FileText },
    { label: "Write Story", href: "/dashboard/posts/new", icon: PenSquare },
    { label: "Audience Growth", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Admin Console", href: "/admin", icon: Sparkles },
  ];

  return (
    <aside className="w-64 border-r border-[#e2e8f2] bg-white dark:border-[#1e3a6a] dark:bg-[#08214e] flex flex-col justify-between h-screen sticky top-0 transition-colors">
      <div className="p-5 space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between">
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
          <ThemeToggle />
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
                    : "text-[#2f3b4d] hover:text-[#08214e] hover:bg-[#f7f9fc] dark:text-slate-300 dark:hover:text-white dark:hover:bg-[#12346e]/40"
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
      <div className="p-4 border-t border-[#e2e8f2] dark:border-[#1e3a6a] space-y-2">
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

        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#f7f9fc] dark:bg-[#041536]/80 border border-[#e2e8f2] dark:border-[#1e3a6a]">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-[#041536] text-[11px] font-black">
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
    </aside>
  );
}
