"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Bookmark,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [bookmarkCount, setBookmarkCount] = React.useState(0);
  const pathname = usePathname();

  React.useEffect(() => {
    const syncBookmarks = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("devlog_saved_bookmarks") || "[]"
        );
        setBookmarkCount(saved.length);
      } catch {}
    };

    syncBookmarks();
    window.addEventListener("bookmarks_updated", syncBookmarks);
    window.addEventListener("storage", syncBookmarks);
    return () => {
      window.removeEventListener("bookmarks_updated", syncBookmarks);
      window.removeEventListener("storage", syncBookmarks);
    };
  }, [pathname]);

  const navLinks = [
    { label: "Articles", href: "/" },
    { label: "Studio", href: "/dashboard" },
    { label: "Series", href: "/series" },
    { label: "Archive", href: "/archive" },
    { label: "Topics", href: "/categories" },
    { label: "Saved", href: "/bookmarks" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#e2e8f2] dark:border-[#1e3a6a] glass-nav transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Logo / Brand (khophi_the_blogger) */}
          <div className="flex items-center gap-4 lg:gap-8 min-w-0">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#08214e] dark:bg-[#12346e] text-white shadow-md border border-amber-400/40 group-hover:scale-105 transition-transform">
                <span className="font-mono font-black text-xs sm:text-sm tracking-tight text-[#f59e0b]">
                  _k
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-[#08214e] dark:text-white font-heading leading-tight group-hover:text-[#20509b] transition-colors truncate">
                  khophi<span className="text-[#f59e0b]">_the_blogger</span>
                </span>
                <span className="hidden sm:inline text-[9px] font-bold uppercase tracking-widest text-[#93a0b4] -mt-0.5">
                  Accra • Africa • Tech &amp; Culture
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                      isActive
                        ? "text-[#20509b] dark:text-[#8ab1e3] bg-[#eef3fa] dark:bg-[#12346e]/50 font-bold"
                        : "text-[#2f3b4d] hover:text-[#08214e] hover:bg-[#eef3fa]/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {link.label}
                    {link.href === "/bookmarks" && bookmarkCount > 0 && (
                      <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[#f59e0b] text-[#08214e] text-[10px] font-bold">
                        {bookmarkCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar (Search, Theme, Mobile Menu - NO Language button) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-[#eef3fa] dark:bg-[#12346e]/40 p-2 sm:px-3 sm:py-1.5 text-xs text-[#2f3b4d] hover:bg-[#e2e8f2] dark:text-slate-300 dark:hover:bg-[#12346e] transition-colors border border-[#e2e8f2] dark:border-[#1e3a6a]"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5 text-[#20509b] dark:text-[#8ab1e3]" />
              <span className="hidden lg:inline font-medium">Search stories...</span>
              <kbd className="hidden sm:inline-block rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

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
          <div className="border-b border-[#e2e8f2] bg-white px-4 py-4 dark:border-[#1e3a6a] dark:bg-[#08214e] md:hidden space-y-2 shadow-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#eef3fa] dark:text-slate-200 dark:hover:bg-[#12346e] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.href === "/bookmarks" && bookmarkCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#f59e0b] text-[#08214e] text-[10px] font-bold">
                      {bookmarkCount}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
