import Link from "next/link";
import { Layers, Tag as TagIcon, Plus } from "lucide-react";
import { getCategories, getTags } from "@/lib/api/categories";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/Button";

export default async function AdminCategoriesPage() {
  const [categories, tags] = await Promise.all([
    getCategories(),
    getTags(),
  ]);

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Taxonomy &amp; Track Governance"
        description="Organize engineering tracks, topics, and technology tags across the platform."
      />

      {/* Categories Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#08214e] dark:text-white font-heading flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#20509b]" />
          <span>Active Architecture Tracks ({categories.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="card-lift p-5 rounded-2xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="brand-tag-gold text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {cat.slug}
                  </span>
                  <span className="text-xs font-mono text-[#93a0b4]">
                    {cat.postCount} articles
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#08214e] dark:text-white font-heading">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#2f3b4d] dark:text-slate-300 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#e2e8f2] dark:border-[#1e3a6a] flex justify-end">
                <Link
                  href={`/categories?slug=${cat.slug}`}
                  target="_blank"
                  className="text-[11px] font-semibold text-[#20509b] dark:text-[#8ab1e3] hover:underline"
                >
                  View Public Track →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="card-lift p-6 rounded-3xl space-y-4">
        <h2 className="text-base font-bold text-[#08214e] dark:text-white font-heading flex items-center gap-2">
          <TagIcon className="h-4 w-4 text-[#20509b]" />
          <span>Technology Tags Index ({tags.length})</span>
        </h2>

        <div className="flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1.5 rounded-xl bg-[#f7f9fc] dark:bg-[#08214e] text-xs font-semibold text-[#08214e] dark:text-white border border-[#e2e8f2] dark:border-[#1e3a6a]"
            >
              #{tag.name} <span className="text-[#93a0b4] ml-1">({tag.postCount})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
