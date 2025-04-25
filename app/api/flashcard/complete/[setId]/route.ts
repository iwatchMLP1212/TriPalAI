import { db } from "@/db/db";
import { flashcardSets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { setId: string } }
) {
  try {
    const setId = parseInt(params.setId);
    if (isNaN(setId)) {
      return NextResponse.json(
        { error: "Invalid flashcard set ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { is_completed } = body;

    if (typeof is_completed !== "boolean") {
      return NextResponse.json(
        { error: "`is_completed` must be a boolean" },
        { status: 400 }
      );
    }

    await db
      .update(flashcardSets)
      .set({ is_completed })
      .where(eq(flashcardSets.id, setId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/flashcard/complete/ error:", error);
    return NextResponse.json(
      { error: "Failed to update flashcard set" },
      { status: 500 }
    );
  }
}
