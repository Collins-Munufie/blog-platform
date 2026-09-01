import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Heart, Bookmark } from "lucide-react";
import { Post } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatCompactNumber } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  variant?: "default" | "compact" | "horizontal";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  if (variant === "horizontal") {
    return (
      <article className="group flex flex-col sm:flex-row gap-5 p-4 sm:p-5 rounded-2xl border border-slate-200/70 bg-white hover:border-primary-500/40 dark:border-slate-800/70 dark:bg-slate-900/40 transition-all hover:shadow-md">
        <div className="relative aspect-[16/10] sm:w-56 sm:aspect-[4/3] rounded-xl overflow-hidden shrink-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                {post.category.name}
              </Badge>
              <span className="text-xs text-slate-400">
                {post.readingTimeMinutes} min read
              </span>
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {post.excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-400">
            <span>{post.author.name} • {formatDate(post.publishedAt)}</span>
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {formatCompactNumber(post.views)}</span>
              <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-red-500" /> {formatCompactNumber(post.likes)}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white hover:border-primary-500/40 dark:border-slate-800/80 dark:bg-slate-900/40 transition-all hover:shadow-lg hover:-translate-y-0.5">
      <div>
        {/* Cover Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="indigo" size="sm">
              {post.category.name}
            </Badge>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readingTimeMinutes} min read</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <Link
            href={`/author/${post.author.id}`}
            className="flex items-center gap-2 group/author"
          >
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={26}
              height={26}
              className="rounded-full object-cover"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover/author:text-primary-600">
              {post.author.name}
            </span>
          </Link>

          <div className="flex items-center gap-2.5 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatCompactNumber(post.views)}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-red-500" />
              {formatCompactNumber(post.likes)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
