import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function GET() {
  const badges = db.getBadges();
  return NextResponse.json(badges);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = db.createBadge(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
