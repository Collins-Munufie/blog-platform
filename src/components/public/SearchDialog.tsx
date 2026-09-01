"use client";

import * as React from "react";
import Link from "next/link";
import { Search, FileText, Tag as TagIcon, X, ArrowRight } from "lucide-react";
import { Post, Tag } from "@/lib/types";
import { getPosts } from "@/lib/api/posts";
import { getTags } from "@/lib/api/categories";
import { Badge } from "@/components/ui/Badge";

export interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = React.useState("");
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      getTags().then(setTags);
    } else {
      setQuery("");
      setPosts([]);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!query.trim()) {
      setPosts([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await getPosts({ query: query.trim() });
      setPosts(res);
      setLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTags = tags.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 z-10 overflow-hidden mt-8">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles, topics, keywords... (Press Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-3 px-2 py-0.5 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {loading && (
            <div className="py-8 text-center text-sm text-slate-500">
              Searching technical knowledge base...
            </div>
          )}

          {!loading && query && posts.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No articles matching &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for keywords like &ldquo;Next.js&rdquo;, &ldquo;PostgreSQL&rdquo;, or &ldquo;Architecture&rdquo;
              </p>
            </div>
          )}

          {/* Tag matches */}
          {filteredTags.length > 0 && query && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Matching Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {filteredTags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/categories?tag=${tag.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-950/50 dark:hover:text-primary-400 transition-colors"
                  >
                    <TagIcon className="h-3 w-3" />
                    {tag.name}
                    <span className="text-[10px] text-slate-400">({tag.postCount})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Article Results */}
          {posts.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Articles ({posts.length})
              </p>
              <div className="space-y-2">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    onClick={onClose}
                    className="group block p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="indigo" size="sm">
                            {post.category.name}
                          </Badge>
                          <span className="text-xs text-slate-400">
                            {post.readingTimeMinutes} min read
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {post.excerpt}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary-600 shrink-0 mt-2 transform group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!query && (
            <div className="py-6 px-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Suggested Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 6).map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setQuery(tag.name)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
