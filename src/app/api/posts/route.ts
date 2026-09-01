import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "published";
  const categorySlug = searchParams.get("categorySlug") || undefined;
  const tagSlug = searchParams.get("tagSlug") || undefined;
  const query = searchParams.get("query") || undefined;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;

  const posts = db.getPosts({ status, categorySlug, tagSlug, query, limit });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPost = db.createPost(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
