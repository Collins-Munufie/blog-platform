import Link from "next/link";
import { getPosts } from "@/lib/api/posts";
import { getAnalyticsSummary } from "@/lib/api/analytics";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { RecentStoriesCard } from "@/components/dashboard/RecentStoriesCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const [allPosts, analytics] = await Promise.all([
    getPosts({ status: "all" }),
    getAnalyticsSummary(),
  ]);

  const recentDrafts = allPosts.filter((p) => p.status === "draft").slice(0, 5);
  const recentPublished = allPosts.filter((p) => p.status === "published").slice(0, 5);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Studio Overview"
        description="Your writing dashboard and audience growth statistics."
      />

      {/* Analytics & Audience Growth */}
      <AnalyticsChart data={analytics} />

      {/* Drafts & Published Stories with Direct Delete Buttons */}
      <RecentStoriesCard
        initialDrafts={recentDrafts}
        initialPublished={recentPublished}
      />
    </div>
  );
}
