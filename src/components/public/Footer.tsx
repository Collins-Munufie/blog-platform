import Link from "next/link";
import { Terminal, Github, Twitter, Linkedin, Rss } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Dev<span className="text-primary-600 dark:text-primary-400">Log</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              An engineering-first editorial publishing platform covering modern web architecture, distributed systems, and AI tooling.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="/feed.xml"
                className="hover:text-amber-500 transition-colors"
                title="RSS Feed"
              >
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Latest Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Topics & Tags
                </Link>
              </li>
              <li>
                <Link href="/author/auth-1" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Engineering Authors
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Editorial Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform / Dashboard */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Creator Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/posts/new" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Rich Post Editor
                </Link>
              </li>
              <li>
                <Link href="/dashboard/posts" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Manage Drafts & Posts
                </Link>
              </li>
              <li>
                <Link href="/dashboard/analytics" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Traffic & Read Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack note */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Built With
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js App Router", "React 18", "TypeScript", "Tailwind CSS", "Lucide", "Next-Themes"].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 pt-2">
              Ready for PostgreSQL, Prisma/Drizzle & Auth backend connectors.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DevLog Platform. Open source engineering template.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/about" className="hover:underline">Privacy Policy</Link>
            <Link href="/about" className="hover:underline">Terms of Service</Link>
            <Link href="/about" className="hover:underline">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
