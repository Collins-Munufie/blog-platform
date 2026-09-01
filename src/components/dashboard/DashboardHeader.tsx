"use client";

import Link from "next/link";
import { PenSquare, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function DashboardHeader({
  title,
  description,
  action,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {action ? (
          action
        ) : (
          <Link href="/dashboard/posts/new">
            <Button size="sm" className="gap-2 shadow-sm rounded-xl">
              <PenSquare className="h-4 w-4" />
              New Article
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
