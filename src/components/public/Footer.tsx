import Link from "next/link";
import { Github, Twitter, Linkedin, Rss, MessageCircle, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#e2e8f2] bg-white dark:border-[#1e3a6a] dark:bg-[#041536] transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#08214e] text-white shadow-sm border border-amber-400/30">
                <span className="font-mono font-black text-xs text-[#f59e0b]">_k</span>
              </div>
              <span className="text-base font-black tracking-tight text-[#08214e] dark:text-white font-heading">
                khophi<span className="text-[#f59e0b]">_the_blogger</span>
              </span>
            </Link>
            <p className="text-xs text-[#2f3b4d] dark:text-slate-300 leading-relaxed">
              Accra-based digital publication reporting on Silicon Accra tech innovation, Afrobeats economics, and Ghanaian culture.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="https://twitter.com/khophi_blogger"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg hover:bg-[#eef3fa] hover:text-[#08214e] dark:hover:bg-[#12346e] dark:hover:text-white transition-colors"
                title="Twitter / X"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/233240000000"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg hover:bg-emerald-50 hover:text-[#25D366] dark:hover:bg-[#12346e] transition-colors"
                title="WhatsApp Channel"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/khophi"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg hover:bg-[#eef3fa] hover:text-[#08214e] dark:hover:bg-[#12346e] dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="/feed.xml"
                className="p-1.5 rounded-lg hover:bg-[#eef3fa] hover:text-[#f59e0b] dark:hover:bg-[#12346e] transition-colors"
                title="RSS Feed"
              >
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Ghanaian Categories */}
          <div>
            <h4 className="text-xs font-bold text-[#08214e] dark:text-slate-100 uppercase tracking-wider mb-4 font-heading">
              Ghanaian Topics
            </h4>
            <ul className="space-y-2.5 text-xs text-[#2f3b4d] dark:text-slate-300 font-medium">
              <li>
                <Link href="/categories?slug=tech-startups" className="hover:text-[#20509b] dark:hover:text-[#8ab1e3] transition-colors">
                  Tech &amp; Startups (Silicon Accra)
                </Link>
              </li>
              <li>
                <Link href="/categories?slug=business-economy" className="hover:text-[#20509b] dark:hover:text-[#8ab1e3] transition-colors">
                  Business &amp; Economy (MoMo &amp; AfCFTA)
                </Link>
              </li>
              <li>
                <Link href="/categories?slug=entertainment-culture" className="hover:text-[#20509b] dark:hover:text-[#8ab1e3] transition-colors">
                  Entertainment, Afrobeats &amp; Film
                </Link>
              </li>
              <li>
                <Link href="/categories?slug=sports-football" className="hover:text-[#20509b] dark:hover:text-[#8ab1e3] transition-colors">
                  Black Stars &amp; Football Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Discovery & Navigation */}
          <div>
            <h4 className="text-xs font-bold text-[#08214e] dark:text-slate-100 uppercase tracking-wider mb-4 font-heading">
              Discovery &amp; Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#2f3b4d] dark:text-slate-300 font-medium">
              <li>
                <Link href="/series" className="hover:text-[#20509b] dark:hover:text-[#8ab1e3] transition-colors">
                  Editorial Series Collections
                </Link>
              </li>
              <li>
                <Link href="/archive" className="hover:text-[#20509b] dark:hover:text-[#8ab1e3] transition-colors">
                  Chronological Archive (By Date)
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-[#20509b] dark:hover:text-[#8ab1e3] transition-colors">
                  Your Saved Stories
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#20509b] dark:hover:text-[#8ab1e3] transition-colors">
                  Administrative Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* About Khophi & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#08214e] dark:text-slate-100 uppercase tracking-wider mb-4 font-heading">
              Community &amp; WhatsApp
            </h4>
            <p className="text-xs text-[#93a0b4] leading-relaxed">
              Join 12,000+ readers receiving our WhatsApp bulletin for breaking Accra tech drops and cultural investigations.
            </p>
            <a
              href="https://wa.me/233240000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/15 text-[#128C7E] dark:text-[#25D366] text-xs font-bold border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" /> Join WhatsApp Channel
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-[#e2e8f2] dark:border-[#1e3a6a] flex flex-col sm:flex-row items-center justify-between text-xs text-[#93a0b4]">
          <p>© {new Date().getFullYear()} khophi_the_blogger. All rights reserved. Accra, Ghana 🇬🇭</p>
          <div className="flex gap-4 mt-3 sm:mt-0 font-medium">
            <Link href="/about" className="hover:text-[#08214e] dark:hover:text-white">About Khophi</Link>
            <Link href="/feed.xml" className="hover:text-[#08214e] dark:hover:text-white">RSS Feed</Link>
            <Link href="/sitemap.xml" className="hover:text-[#08214e] dark:hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
