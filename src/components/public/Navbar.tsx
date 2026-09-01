"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  PenSquare,
  Sparkles,
  Bookmark,
  LayoutDashboard,
  ArrowRight,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [bookmarkCount, setBookmarkCount] = React.useState(0);
  const pathname = usePathname();

  React.useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("devlog_saved_bookmarks") || "[]"
      );
      setBookmarkCount(saved.length);
    } catch {
      // Ignore
    }
  }, [pathname]);

  const navLinks = [
    { label: "Publications", href: "/" },
    { label: "Architecture Tracks", href: "/categories" },
    { label: "Saved Stories", href: "/bookmarks" },
    { label: "About & Standards", href: "/about" },
  ];

  return (
    <>
      {/* Top Announcement Banner inspired by dummyegator */}
      <div className="bg-[#08214e] text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium border-b border-blue-900/50 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="flex items-center gap-1 text-[#fdc035] font-semibold">
            <Zap className="h-3.5 w-3.5 fill-[#fdc035]" /> New Deep-Dive:
          </span>
          <Link
            href="/blog/mastering-nextjs-server-actions-and-caching"
            className="hover:underline flex items-center gap-1 text-slate-200 hover:text-white"
          >
            <span>Mastering Next.js Server Actions & Edge Caching</span>
            <ArrowRight className="h-3 w-3 text-[#fdc035]" />
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-[#e2e8f2] dark:border-[#1e3a6a] glass-nav transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#08214e] via-[#20509b] to-[#3d76c6] text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform border border-blue-400/30">
                <span className="font-extrabold text-sm tracking-wider text-[#fdc035]">
                  D
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-[#08214e] dark:text-white font-heading leading-tight">
                  Dev<span className="text-[#20509b] dark:text-[#6394d6]">Log</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#93a0b4] -mt-0.5">
                  Academy of Engineering
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                      isActive
                        ? "text-[#20509b] dark:text-[#6394d6] bg-[#eef3fa] dark:bg-[#12346e]/50 font-bold"
                        : "text-[#2f3b4d] hover:text-[#08214e] hover:bg-[#eef3fa]/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {link.label}
                    {link.href === "/bookmarks" && bookmarkCount > 0 && (
                      <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[#f4ae17] text-[#08214e] text-[10px] font-bold">
                        {bookmarkCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Palette Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-[#eef3fa] dark:bg-[#12346e]/40 px-3 py-1.5 text-xs text-[#2f3b4d] hover:bg-[#e2e8f2] dark:text-slate-300 dark:hover:bg-[#12346e] transition-colors border border-[#e2e8f2] dark:border-[#1e3a6a]"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5 text-[#20509b] dark:text-[#8ab1e3]" />
              <span className="hidden sm:inline font-medium">Search knowledge base...</span>
              <kbd className="hidden sm:inline-block rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Creator / Dashboard Link */}
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-xl border-[#b9d2f0] text-[#08214e] hover:bg-[#eef3fa] dark:border-[#1e3a6a] dark:text-slate-200"
                >
                  <LayoutDashboard className="h-3.5 w-3.5 text-[#20509b] dark:text-[#8ab1e3]" />
                  Studio
                </Button>
              </Link>
              <Link href="/dashboard/posts/new">
                <Button
                  size="sm"
                  className="gap-1.5 rounded-xl bg-[#20509b] hover:bg-[#12346e] text-white shadow-md shadow-blue-900/20 font-semibold"
                >
                  <PenSquare className="h-3.5 w-3.5 text-[#fdc035]" />
                  Write
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="border-b border-[#e2e8f2] bg-white px-4 py-4 dark:border-[#1e3a6a] dark:bg-[#08214e] md:hidden space-y-3 shadow-xl">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#eef3fa] dark:text-slate-200 dark:hover:bg-[#12346e]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Creator Studio
                </Button>
              </Link>
              <Link href="/dashboard/posts/new" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full justify-center gap-2 bg-[#20509b]">
                  <PenSquare className="h-4 w-4" />
                  Write Article
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
