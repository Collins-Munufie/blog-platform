import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const likes = db.toggleLikePost(params.id);
  return NextResponse.json({ likes });
}
