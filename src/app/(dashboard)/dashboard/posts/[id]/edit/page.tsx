import { notFound } from "next/navigation";
import { getPostById } from "@/lib/api/posts";
import { Editor } from "@/components/dashboard/Editor";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  return <Editor initialPost={post} mode="edit" />;
}
