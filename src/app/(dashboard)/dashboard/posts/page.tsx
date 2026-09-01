import Link from "next/link";
import { PenSquare } from "lucide-react";
import { getPosts } from "@/lib/api/posts";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PostDataTable } from "@/components/dashboard/PostDataTable";
import { Button } from "@/components/ui/Button";

export default async function DashboardPostsPage() {
  const posts = await getPosts({ status: "all" });

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-6">
      <DashboardHeader
        title="Articles & Drafts Management"
        description="Filter, edit, preview, and organize your publication catalog."
        action={
          <Link href="/dashboard/posts/new">
            <Button size="sm" className="gap-2 shadow-sm rounded-xl">
              <PenSquare className="h-4 w-4" />
              Write New Article
            </Button>
          </Link>
        }
      />

      <PostDataTable initialPosts={posts} />
    </div>
  );
}
