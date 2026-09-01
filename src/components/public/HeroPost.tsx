import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Heart, ArrowUpRight } from "lucide-react";
import { Post } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatCompactNumber } from "@/lib/utils";

export function HeroPost({ post }: { post: Post }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl dark:border-slate-800/80 dark:bg-slate-900/60 transition-all hover:border-primary-500/50 dark:hover:border-primary-500/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:col-span-7 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-600/90 text-white backdrop-blur-md shadow-lg">
              ★ Featured Deep-Dive
            </span>
          </div>
        </div>

        {/* Post Metadata & Content */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo" size="md">
                {post.category.name}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readingTimeMinutes} min read</span>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                {post.title}
              </h2>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Author & Footer Info */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Link
              href={`/author/${post.author.id}`}
              className="flex items-center gap-3 group/author"
            >
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover/author:text-primary-600 dark:group-hover/author:text-primary-400 transition-colors">
                  {post.author.name}
                </p>
                <p className="text-xs text-slate-400">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {formatCompactNumber(post.views)}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500/20" />
                {formatCompactNumber(post.likes)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
