import { getPostById } from "@/lib/api/posts";
import { EditPostClient } from "@/components/dashboard/EditPostClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await getPostById(params.id);
  return <EditPostClient id={params.id} serverPost={post} />;
}
