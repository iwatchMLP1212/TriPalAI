import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { flashcards } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ setId: string }> }
) {
  try {
    const resolvedParams = await params;
    const setId = parseInt(resolvedParams.setId, 10);

    if (isNaN(setId)) {
      return NextResponse.json({ error: "Invalid set ID" }, { status: 400 });
    }

    const data = await db
      .select()
      .from(flashcards)
      .where(eq(flashcards.flashcard_set_id, setId));

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /flashcards/set/[setId] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch flashcards" },
      { status: 500 }
    );
  }
}
