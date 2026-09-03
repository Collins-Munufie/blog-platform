import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  let post = db.getPostById(params.id);
  if (!post) {
    post = db.getPostBySlug(params.id);
  }
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404, headers: CACHE_HEADERS });
  }
  return NextResponse.json(post, { headers: CACHE_HEADERS });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = db.updatePost(params.id, body);
    return NextResponse.json(updated, { headers: CACHE_HEADERS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: CACHE_HEADERS });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = db.deletePost(params.id);
  return NextResponse.json({ success: deleted }, { headers: CACHE_HEADERS });
}
