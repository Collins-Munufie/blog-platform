import Link from "next/link";
import { PenSquare, Sparkles } from "lucide-react";
import { getPosts } from "@/lib/api/posts";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostDataTable } from "@/components/dashboard/PostDataTable";
import { Button } from "@/components/ui/Button";

export default async function AdminPostsPage() {
  const posts = await getPosts({ status: "all" });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Administrative Catalog &amp; Moderation"
        description="Oversee all published articles, working drafts, and scheduled deep-dives with direct status controls."
        action={
          <Link href="/dashboard/posts/new">
            <Button
              size="sm"
              className="gap-2 bg-[#20509b] text-white rounded-xl text-xs h-9 font-semibold"
            >
              <PenSquare className="h-4 w-4" /> Author New Story
            </Button>
          </Link>
        }
      />

      <PostDataTable initialPosts={posts} />
    </div>
  );
}
