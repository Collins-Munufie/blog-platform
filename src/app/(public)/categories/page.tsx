import Link from "next/link";
import { Layers, Tag as TagIcon, ArrowRight } from "lucide-react";
import { getCategories, getTags } from "@/lib/api/categories";
import { getPosts } from "@/lib/api/posts";
import { PostCard } from "@/components/public/PostCard";
import { Badge } from "@/components/ui/Badge";

interface CategoriesPageProps {
  searchParams: {
    slug?: string;
    tag?: string;
  };
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const [categories, tags, posts] = await Promise.all([
    getCategories(),
    getTags(),
    getPosts({
      categorySlug: searchParams.slug,
      tagSlug: searchParams.tag,
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === searchParams.slug);
  const activeTag = tags.find((t) => t.slug === searchParams.tag);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Topics & Categories
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Filter engineering insights by architecture tracks or specific technologies.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const isActive = category.slug === searchParams.slug;
          return (
            <Link
              key={category.id}
              href={isActive ? "/categories" : `/categories?slug=${category.slug}`}
              className={`p-5 rounded-2xl border transition-all ${
                isActive
                  ? "border-primary-500 bg-primary-50/40 dark:bg-primary-950/30 shadow-md ring-2 ring-primary-500/20"
                  : "border-slate-200/80 bg-white hover:border-primary-500/40 dark:border-slate-800/80 dark:bg-slate-900/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant={isActive ? "indigo" : "default"}>
                  {category.name}
                </Badge>
                <span className="text-xs text-slate-400">
                  {category.postCount} posts
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                {category.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Tags Clouds */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <TagIcon className="h-3.5 w-3.5" />
          <span>All Technology Tags</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = tag.slug === searchParams.tag;
            return (
              <Link
                key={tag.id}
                href={isSelected ? "/categories" : `/categories?tag=${tag.slug}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-primary-600 text-white shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-950/50 border border-slate-200 dark:border-slate-700"
                }`}
              >
                #{tag.name}
                <span className="ml-1 opacity-60">({tag.postCount})</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Filtered Posts Feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {activeCategory
              ? `Articles in "${activeCategory.name}"`
              : activeTag
              ? `Articles tagged with #${activeTag.name}`
              : "All Technical Articles"}
            <span className="text-sm font-normal text-slate-400 ml-2">
              ({posts.length} {posts.length === 1 ? "article" : "articles"})
            </span>
          </h2>
          {(searchParams.slug || searchParams.tag) && (
            <Link
              href="/categories"
              className="text-xs font-semibold text-primary-600 hover:underline"
            >
              Clear Filter
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-slate-500 text-sm">No articles match this criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
