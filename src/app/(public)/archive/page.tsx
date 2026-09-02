import { getPosts } from "@/lib/api/posts";
import { getCategories } from "@/lib/api/categories";
import { LiveArchiveView } from "@/components/public/LiveArchiveView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ArchivePage() {
  const [posts, categories] = await Promise.all([
    getPosts({ status: "published" }),
    getCategories(),
  ]);

  return <LiveArchiveView initialPosts={posts} initialCategories={categories} />;
}
