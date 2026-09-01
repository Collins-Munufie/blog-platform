import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  let post = db.getPostById(params.id);
  if (!post) {
    post = db.getPostBySlug(params.id);
  }
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = db.updatePost(params.id, body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = db.deletePost(params.id);
  return NextResponse.json({ success: deleted });
}
