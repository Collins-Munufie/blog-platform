"use client";

import * as React from "react";
import Image from "next/image";
import { Sparkles, Globe, Image as ImageIcon, Tag as TagIcon, Hash } from "lucide-react";
import { Category, Tag, PostStatus } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/utils";

interface PostSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  slug: string;
  setSlug: (s: string) => void;
  excerpt: string;
  setExcerpt: (e: string) => void;
  coverImage: string;
  setCoverImage: (url: string) => void;
  categoryId: string;
  setCategoryId: (id: string) => void;
  categories: Category[];
  selectedTagIds: string[];
  setSelectedTagIds: (ids: string[]) => void;
  allTags: Tag[];
  metaTitle: string;
  setMetaTitle: (t: string) => void;
  metaDescription: string;
  setMetaDescription: (d: string) => void;
}

const SAMPLE_COVERS = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
];

export function PostSettingsModal({
  isOpen,
  onClose,
  title,
  slug,
  setSlug,
  excerpt,
  setExcerpt,
  coverImage,
  setCoverImage,
  categoryId,
  setCategoryId,
  categories,
  selectedTagIds,
  setSelectedTagIds,
  allTags,
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
}: PostSettingsModalProps) {
  const toggleTag = (id: string) => {
    if (selectedTagIds.includes(id)) {
      setSelectedTagIds(selectedTagIds.filter((t) => t !== id));
    } else {
      setSelectedTagIds([...selectedTagIds, id]);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Article Publishing Settings"
      description="Configure metadata, category taxonomy, cover imagery, and SEO parameters."
      maxWidth="2xl"
    >
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
        {/* Custom Slug */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>URL Slug</span>
            <button
              type="button"
              onClick={() => setSlug(slugify(title))}
              className="text-[11px] text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3" /> Auto-generate from Title
            </button>
          </label>
          <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3">
            <span className="text-xs text-slate-400">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="my-article-slug"
              className="w-full bg-transparent py-2 pl-1 text-xs text-slate-900 focus:outline-none dark:text-slate-100 font-mono"
            />
          </div>
        </div>

        {/* Category & Tags Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Primary Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Topic Tags
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1.5 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950">
              {allTags.map((tag) => {
                const isSelected = selectedTagIds.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      isSelected
                        ? "bg-primary-600 text-white"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    #{tag.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Article Excerpt / Summary
          </label>
          <Textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A brief 1-2 sentence hook for cards and social shares..."
          />
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <ImageIcon className="h-3.5 w-3.5" /> Cover Image
          </label>
          <Input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
          />
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400">Presets:</span>
            {SAMPLE_COVERS.map((url, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCoverImage(url)}
                className="relative h-8 w-12 rounded overflow-hidden border border-slate-300 hover:ring-2 hover:ring-primary-500"
              >
                <Image src={url} alt="preset" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* SEO SERP Simulator */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Google Search Preview
            </h4>
          </div>

          <div className="space-y-2">
            <Input
              placeholder="SEO Meta Title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
            <Textarea
              rows={2}
              placeholder="SEO Meta Description (150-160 chars recommended)"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
          </div>

          {/* Simulated Google Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-sans space-y-1">
            <p className="text-xs text-emerald-700 dark:text-emerald-400 truncate">
              https://devlog.io/blog/{slug || "your-slug"}
            </p>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-400 truncate">
              {metaTitle || title || "Untitled Article - DevLog"}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
              {metaDescription || excerpt || "Write an engaging summary to maximize search click-through rate."}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button onClick={onClose} size="sm">
            Done & Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
}
