import { NextResponse } from "next/server";
import { getPosts, createPost } from "@/lib/api/posts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as any || "all";
  const posts = await getPosts({ status });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPost = await createPost(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
