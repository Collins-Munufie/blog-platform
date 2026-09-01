import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/api/posts";
import { ArticleReader } from "@/components/public/ArticleReader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Story - khophi_the_blogger",
      description: "Read the latest story on khophi_the_blogger.",
    };
  }

  return {
    title: `${post.title} | khophi_the_blogger`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPostBySlug(params.slug);
  return <ArticleReader slug={params.slug} initialPost={post} />;
}
