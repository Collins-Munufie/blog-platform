import Link from "next/link";
import { Github, Twitter, Linkedin, Rss, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#e2e8f2] bg-white dark:border-[#1e3a6a] dark:bg-[#041536] transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#08214e] via-[#20509b] to-[#3d76c6] text-white shadow-sm">
                <span className="font-extrabold text-xs text-[#fdc035]">D</span>
              </div>
              <span className="text-lg font-black tracking-tight text-[#08214e] dark:text-white font-heading">
                Dev<span className="text-[#20509b] dark:text-[#6394d6]">Log</span>
              </span>
            </Link>
            <p className="text-xs text-[#2f3b4d] dark:text-slate-300 leading-relaxed">
              Academy of engineering architecture, edge systems, high-performance TypeScript, and distributed resilience.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg hover:bg-[#eef3fa] hover:text-[#08214e] dark:hover:bg-[#12346e] dark:hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg hover:bg-[#eef3fa] hover:text-[#08214e] dark:hover:bg-[#12346e] dark:hover:text-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg hover:bg-[#eef3fa] hover:text-[#08214e] dark:hover:bg-[#12346e] dark:hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="/feed.xml"
                className="p-1.5 rounded-lg hover:bg-[#eef3fa] hover:text-[#f4ae17] dark:hover:bg-[#12346e] transition-colors"
                title="RSS Feed"
              >
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Curriculum / Explore */}
          <div>
            <h4 className="text-xs font-bold text-[#08214e] dark:text-slate-100 uppercase tracking-wider mb-4 font-heading">
              Curriculum Tracks
            </h4>
            <ul className="space-y-2.5 text-xs text-[#2f3b4d] dark:text-slate-300 font-medium">
              <li>
                <Link href="/categories?slug=engineering-architecture" className="hover:text-[#20509b] dark:hover:text-[#6394d6] transition-colors">
                  Engineering &amp; Architecture
                </Link>
              </li>
              <li>
                <Link href="/categories?slug=frontend-ui-systems" className="hover:text-[#20509b] dark:hover:text-[#6394d6] transition-colors">
                  Frontend &amp; UI Systems
                </Link>
              </li>
              <li>
                <Link href="/categories?slug=ai-agentic-systems" className="hover:text-[#20509b] dark:hover:text-[#6394d6] transition-colors">
                  AI &amp; Agentic Systems
                </Link>
              </li>
              <li>
                <Link href="/categories?slug=devops-cloud-native" className="hover:text-[#20509b] dark:hover:text-[#6394d6] transition-colors">
                  DevOps &amp; Cloud Native
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio & Tools */}
          <div>
            <h4 className="text-xs font-bold text-[#08214e] dark:text-slate-100 uppercase tracking-wider mb-4 font-heading">
              Creator Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-[#2f3b4d] dark:text-slate-300 font-medium">
              <li>
                <Link href="/dashboard" className="hover:text-[#20509b] dark:hover:text-[#6394d6] transition-colors">
                  Executive Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/posts/new" className="hover:text-[#20509b] dark:hover:text-[#6394d6] transition-colors">
                  Rich Article Editor
                </Link>
              </li>
              <li>
                <Link href="/dashboard/posts" className="hover:text-[#20509b] dark:hover:text-[#6394d6] transition-colors">
                  Post &amp; Draft Catalog
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-[#20509b] dark:hover:text-[#6394d6] transition-colors">
                  Your Saved Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Platform Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#08214e] dark:text-slate-100 uppercase tracking-wider mb-4 font-heading">
              Platform Standards
            </h4>
            <p className="text-xs text-[#93a0b4] leading-relaxed">
              Every publication is reviewed for reproducible code examples, performance benchmarks, and zero-downtime database patterns.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff9eb] dark:bg-[#f4ae17]/10 text-[#d9940c] dark:text-[#fdc035] text-[11px] font-bold border border-[#ffe299] dark:border-[#f4ae17]/30">
              <Zap className="h-3 w-3 fill-current" /> Peer-Reviewed Standards
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#e2e8f2] dark:border-[#1e3a6a] flex flex-col sm:flex-row items-center justify-between text-xs text-[#93a0b4]">
          <p>© {new Date().getFullYear()} DevLog Platform. Inspired by Academy of Engineering Excellence.</p>
          <div className="flex gap-4 mt-3 sm:mt-0 font-medium">
            <Link href="/about" className="hover:text-[#08214e] dark:hover:text-white">Editorial Guidelines</Link>
            <Link href="/feed.xml" className="hover:text-[#08214e] dark:hover:text-white">RSS Feed</Link>
            <Link href="/sitemap.xml" className="hover:text-[#08214e] dark:hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
