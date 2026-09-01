"use client";

import * as React from "react";

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

      {action && (
        <div className="flex flex-wrap items-center gap-2">
          {action}
        </div>
      )}
    </div>
  );
}
