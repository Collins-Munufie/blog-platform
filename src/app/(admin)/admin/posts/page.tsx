import Link from "next/link";
import { PenSquare } from "lucide-react";
import { getPosts } from "@/lib/api/posts";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostDataTable } from "@/components/dashboard/PostDataTable";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPostsPage() {
  const posts = await getPosts({ status: "all" });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Articles &amp; Catalog Governance"
        description="Oversee all published stories and drafts."
        action={
          <Link href="/dashboard/posts/new">
            <Button
              size="sm"
              className="gap-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs h-9 font-semibold hover:opacity-90"
            >
              <PenSquare className="h-4 w-4" /> New Story
            </Button>
          </Link>
        }
      />

      <PostDataTable initialPosts={posts} />
    </div>
  );
}
