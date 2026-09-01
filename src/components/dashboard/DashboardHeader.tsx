"use client";

import * as React from "react";
import Link from "next/link";
import { PenSquare } from "lucide-react";
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-stone-200 dark:border-stone-800">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-heading">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {action ? (
          action
        ) : (
          <Link href="/dashboard/posts/new">
            <Button size="sm" className="gap-1.5 shadow-sm rounded-xl text-xs bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90">
              <PenSquare className="h-3.5 w-3.5" />
              <span>New Post</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
