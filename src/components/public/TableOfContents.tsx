"use client";

import * as React from "react";
import { List } from "lucide-react";
import { slugify } from "@/lib/utils";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}

export function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -70% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-3 rounded-2xl border border-slate-200/80 bg-white/60 p-5 dark:border-slate-800/80 dark:bg-slate-900/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
        <List className="h-4 w-4 text-primary-600 dark:text-primary-400" />
        <span>Table of Contents</span>
      </div>

      <ul className="space-y-2 text-xs">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const indent = heading.level === 3 ? "pl-3" : heading.level === 4 ? "pl-6" : "";

          return (
            <li key={heading.id} className={indent}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setActiveId(heading.id);
                }}
                className={`block py-1 transition-colors ${
                  isActive
                    ? "font-semibold text-primary-600 dark:text-primary-400 border-l-2 border-primary-600 pl-2 -ml-2 dark:border-primary-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
