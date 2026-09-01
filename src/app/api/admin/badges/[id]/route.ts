import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = db.deleteBadge(params.id);
  return NextResponse.json({ success: deleted });
}
