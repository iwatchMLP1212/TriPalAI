import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db"; // adjust path if needed
import { flashcards } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userEmail: string }> }
) {
  const userEmail = (await params).userEmail;

  try {
    const cards = await db
      .select()
      .from(flashcards)
      .where(eq(flashcards.user_email, userEmail));

    return NextResponse.json(cards);
  } catch (err) {
    console.error("GET /api/flashcard/[userEmail] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch flashcards" },
      { status: 500 }
    );
  }
}
