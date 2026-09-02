import { getCategories, getTags } from "@/lib/api/categories";
import { getPosts } from "@/lib/api/posts";
import { LiveCategoryView } from "@/components/public/LiveCategoryView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
      status: "published",
      categorySlug: searchParams.slug,
      tagSlug: searchParams.tag,
    }),
  ]);

  return (
    <LiveCategoryView
      initialCategories={categories}
      initialTags={tags}
      initialPosts={posts}
      currentCategorySlug={searchParams.slug}
      currentTagSlug={searchParams.tag}
    />
  );
}
