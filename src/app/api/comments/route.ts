import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  if (!postId) {
    return NextResponse.json({ error: "postId required" }, { status: 400 });
  }
  const comments = db.getCommentsByPostId(postId);
  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newComment = db.addComment(body);
    return NextResponse.json(newComment, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
