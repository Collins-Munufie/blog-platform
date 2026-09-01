import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Twitter, Github, Globe, BookOpen, Heart, Eye } from "lucide-react";
import { MOCK_AUTHORS } from "@/lib/mock-data";
import { getPosts } from "@/lib/api/posts";
import { PostCard } from "@/components/public/PostCard";
import { formatCompactNumber } from "@/lib/utils";

interface AuthorPageProps {
  params: {
    id: string;
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = MOCK_AUTHORS.find((a) => a.id === params.id) || MOCK_AUTHORS[0];

  if (!author) {
    notFound();
  }

  const posts = await getPosts({ authorId: author.id });
  const totalViews = posts.reduce((acc, p) => acc + p.views, 0);
  const totalLikes = posts.reduce((acc, p) => acc + p.likes, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Author Profile Banner Card */}
      <div className="p-8 sm:p-10 rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/60 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <Image
            src={author.avatar}
            alt={author.name}
            width={100}
            height={100}
            className="rounded-full object-cover ring-4 ring-primary-500/20"
          />

          <div className="space-y-3 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {author.name}
                </h1>
                <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-0.5">
                  {author.role}
                </p>
              </div>

              {/* Social links */}
              <div className="flex items-center justify-center gap-3 text-slate-500 dark:text-slate-400">
                {author.twitter && (
                  <a href={author.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors">
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {author.github && (
                  <a href={author.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors">
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {author.website && (
                  <a href={author.website} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors">
                    <Globe className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {author.bio}
            </p>

            {/* Author Metrics */}
            <div className="flex items-center justify-center sm:justify-start gap-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <BookOpen className="h-4 w-4 text-primary-600" /> {posts.length} Articles
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Eye className="h-4 w-4 text-indigo-600" /> {formatCompactNumber(totalViews)} Reads
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Heart className="h-4 w-4 text-red-500" /> {formatCompactNumber(totalLikes)} Reactions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Author's Articles Feed */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Publications by {author.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
