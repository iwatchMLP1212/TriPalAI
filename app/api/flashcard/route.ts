import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db"; // adjust path based on your project structure
import { flashcards } from "@/db/schema";
import { eq } from "drizzle-orm";

import { StatusCode } from "@/lib/utils";

// GET /api/flashcard
export async function GET(req: NextRequest) {
  try {
    const data = await db.select().from(flashcards);
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /flashcards error:", err);
    return NextResponse.json(
      { error: "Failed to fetch flashcards" },
      { status: 500 }
    );
  }
}

// DELETE /api/flashcard?id=1
export async function DELETE(req: NextRequest) {
  try {
    const id = parseInt(req.nextUrl.searchParams.get("id") || "", 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid or missing ID" },
        { status: StatusCode.BadRequest }
      );
    }

    await db.delete(flashcards).where(eq(flashcards.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /flashcards error:", err);
    return NextResponse.json(
      { error: "Failed to delete flashcard" },
      { status: StatusCode.InternalServerError }
    );
  }
}
