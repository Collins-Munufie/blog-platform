import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = (globalThis as any).__SERVER_DB__;
  if (data && data.posts) {
    const post = data.posts.find((p: any) => p.id === params.id || p.slug === params.id);
    if (post) {
      post.views = (post.views || 0) + 1;
      return NextResponse.json({ views: post.views });
    }
  }
  return NextResponse.json({ views: 1 });
}
