"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  BarChart3,
  Globe,
  Settings,
  Terminal,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "@/components/public/ThemeToggle";

export function DashboardSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Posts & Drafts", href: "/dashboard/posts", icon: FileText },
    { label: "Write Article", href: "/dashboard/posts/new", icon: PenSquare },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 flex flex-col justify-between h-screen sticky top-0">
      <div className="p-5 space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
              <Terminal className="h-4 w-4" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white">
              DevLog <span className="text-xs font-normal text-slate-400">Studio</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-primary-600 dark:text-primary-400" : ""}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Switch to public site */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <Globe className="h-4 w-4" />
          <span>View Public Site</span>
        </Link>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            ER
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
              Elena Rostova
            </p>
            <p className="text-[10px] text-slate-400 truncate">Admin / Author</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
