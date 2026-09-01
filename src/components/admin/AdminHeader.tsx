"use client";

import Link from "next/link";
import { PenSquare, Bell, ShieldCheck, Sparkles, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AdminHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminHeader({
  title,
  description,
  action,
}: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#e2e8f2] dark:border-[#1e3a6a]">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Admin Gateway Active
          </span>
          <span className="text-xs text-[#93a0b4] font-mono">v2.6.0-stable</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#08214e] dark:text-white font-heading">
          {title}
        </h1>

        {description && (
          <p className="text-xs sm:text-sm text-[#2f3b4d] dark:text-slate-300">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        {action ? (
          action
        ) : (
          <>
            <Link href="/admin/applications">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-xl border-[#b9d2f0] text-[#08214e] dark:border-[#1e3a6a] dark:text-white text-xs h-9"
              >
                <Users className="h-3.5 w-3.5 text-[#20509b]" />
                Review Applications
              </Button>
            </Link>
            <Link href="/dashboard/posts/new">
              <Button
                size="sm"
                className="gap-1.5 rounded-xl bg-[#20509b] hover:bg-[#12346e] text-white shadow-md text-xs h-9 font-semibold"
              >
                <PenSquare className="h-3.5 w-3.5 text-[#fdc035]" />
                New Article
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
