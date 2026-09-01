import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Eye, Calendar, ArrowLeft, Twitter, Github, Globe } from "lucide-react";
import { getPostBySlug, getPosts } from "@/lib/api/posts";
import { getCommentsByPostId } from "@/lib/api/comments";
import { Badge } from "@/components/ui/Badge";
import { ArticleContent } from "@/components/public/ArticleContent";
import { TableOfContents, extractHeadings } from "@/components/public/TableOfContents";
import { InteractionBar } from "@/components/public/InteractionBar";
import { CommentsSection } from "@/components/public/CommentsSection";
import { PostCard } from "@/components/public/PostCard";
import { ReadingProgressBar } from "@/components/public/ReadingProgressBar";
import { formatDate, formatCompactNumber } from "@/lib/utils";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
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

  if (!post) {
    notFound();
  }

  const [comments, relatedPosts] = await Promise.all([
    getCommentsByPostId(post.id),
    getPosts({ categorySlug: post.category.slug, limit: 3 }),
  ]);

  const filteredRelated = relatedPosts.filter((p) => p.id !== post.id).slice(0, 2);
  const headings = extractHeadings(post.content);

  return (
    <>
      <ReadingProgressBar />
      <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link & Category */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Articles</span>
          </Link>
          <Link href={`/categories?slug=${post.category.slug}`}>
            <Badge variant="indigo" size="md">
              {post.category.name}
            </Badge>
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl space-y-6 mb-10">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Link
              href={`/author/${post.author.id}`}
              className="flex items-center gap-3.5 group/author"
            >
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={44}
                height={44}
                className="rounded-full object-cover ring-2 ring-primary-500/20"
              />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white group-hover/author:text-primary-600 transition-colors">
                  {post.author.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {post.author.role}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTimeMinutes} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {formatCompactNumber(post.views)} views
              </span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl mb-12 shadow-lg border border-slate-200 dark:border-slate-800">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Two-Column Reader Layout: Main Content + Sticky Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            {/* Article Body */}
            <ArticleContent content={post.content} />

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Tagged in:</span>
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/categories?tag=${tag.slug}`}>
                  <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    #{tag.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Interactive Reactions & Share Bar */}
            <InteractionBar
              postId={post.id}
              title={post.title}
              initialLikes={post.likes}
              initialBookmarks={post.bookmarksCount}
              commentsCount={comments.length}
            />

            {/* Author Bio Box */}
            <div className="my-10 p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={64}
                height={64}
                className="rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-800"
              />
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Written by {post.author.name}
                  </h4>
                  <div className="flex items-center gap-2 text-slate-400">
                    {post.author.twitter && (
                      <a href={post.author.twitter} target="_blank" rel="noreferrer" className="hover:text-primary-600">
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                    {post.author.github && (
                      <a href={post.author.github} target="_blank" rel="noreferrer" className="hover:text-primary-600">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {post.author.website && (
                      <a href={post.author.website} target="_blank" rel="noreferrer" className="hover:text-primary-600">
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <CommentsSection postId={post.id} initialComments={comments} />
          </div>

          {/* Sidebar Sticky ToC Column */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              <TableOfContents headings={headings} />

              {/* Author Quick Card in Sidebar */}
              <div className="p-5 rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/40 space-y-3 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  About the Author
                </h4>
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {post.author.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Grid */}
        {filteredRelated.length > 0 && (
          <section className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Related Engineering Deep-Dives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRelated.map((related) => (
                <PostCard key={related.id} post={related} variant="horizontal" />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
