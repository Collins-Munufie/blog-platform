"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  PenSquare,
  Bookmark,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  Archive,
  Layers,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { LanguageSwitcher, LocalizedGreetingBanner } from "./LanguageSwitcher";
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
    } catch {}
  }, [pathname]);

  const navLinks = [
    { label: "Articles", href: "/" },
    { label: "Series", href: "/series" },
    { label: "Archive", href: "/archive" },
    { label: "Topics", href: "/categories" },
    { label: "Saved", href: "/bookmarks" },
    { label: "About Khophi", href: "/about" },
  ];

  return (
    <>
      {/* Localized Greeting Alert Banner */}
      <LocalizedGreetingBanner />

      <header className="sticky top-0 z-40 w-full border-b border-[#e2e8f2] dark:border-[#1e3a6a] glass-nav transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Brand (khophi_the_blogger) */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#08214e] dark:bg-[#12346e] text-white shadow-md border border-amber-400/40 group-hover:scale-105 transition-transform">
                <span className="font-mono font-black text-sm tracking-tight text-[#f59e0b]">
                  _k
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-[#08214e] dark:text-white font-heading leading-tight group-hover:text-[#20509b] transition-colors">
                  khophi<span className="text-[#f59e0b]">_the_blogger</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#93a0b4] -mt-0.5">
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

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-[#eef3fa] dark:bg-[#12346e]/40 px-3 py-1.5 text-xs text-[#2f3b4d] hover:bg-[#e2e8f2] dark:text-slate-300 dark:hover:bg-[#12346e] transition-colors border border-[#e2e8f2] dark:border-[#1e3a6a]"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5 text-[#20509b] dark:text-[#8ab1e3]" />
              <span className="hidden lg:inline font-medium">Search Accra &amp; Africa posts...</span>
              <kbd className="hidden sm:inline-block rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Multilingual Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Creator Studio Link */}
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-xl border-[#b9d2f0] text-[#08214e] hover:bg-[#eef3fa] dark:border-[#1e3a6a] dark:text-slate-200 text-xs h-8"
                >
                  <LayoutDashboard className="h-3.5 w-3.5 text-[#20509b]" />
                  Admin
                </Button>
              </Link>
              <Link href="/dashboard/posts/new">
                <Button
                  size="sm"
                  className="gap-1.5 rounded-xl bg-[#08214e] hover:bg-[#12346e] text-white shadow-md text-xs h-8 font-semibold"
                >
                  <PenSquare className="h-3.5 w-3.5 text-[#f59e0b]" />
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
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center gap-2 text-xs">
                  <LayoutDashboard className="h-4 w-4" /> Admin Console
                </Button>
              </Link>
              <Link href="/dashboard/posts/new" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full justify-center gap-2 bg-[#08214e] text-xs">
                  <PenSquare className="h-4 w-4 text-[#f59e0b]" /> Write Article
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
