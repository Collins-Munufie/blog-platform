"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { getPostById } from "@/lib/api/posts";
import { Post } from "@/lib/types";
import { Editor } from "@/components/dashboard/Editor";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function EditPostClient({
  id,
  serverPost,
}: {
  id: string;
  serverPost?: Post | null;
}) {
  const [post, setPost] = React.useState<Post | null>(serverPost || null);
  const [loading, setLoading] = React.useState(!serverPost);
  const router = useRouter();

  React.useEffect(() => {
    if (!post) {
      getPostById(id).then((found) => {
        setPost(found);
        setLoading(false);
      });
    }
  }, [id, post]);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500 mx-auto" />
        <p className="text-xs text-stone-500 font-mono">Loading story editor...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-16 text-center max-w-md mx-auto p-8 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-4">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-heading">
          Article Not Found
        </h2>
        <p className="text-xs text-stone-500">
          The requested article or draft could not be located in your publication store.
        </p>
        <Link href="/dashboard/posts">
          <Button size="sm" variant="outline" className="gap-2 rounded-xl text-xs">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Articles &amp; Drafts</span>
          </Button>
        </Link>
      </div>
    );
  }

  return <Editor initialPost={post} mode="edit" />;
}
