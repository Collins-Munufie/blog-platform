import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address required" }, { status: 400 });
    }
    const result = db.subscribeNewsletter(email);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
