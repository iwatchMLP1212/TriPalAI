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

// POST /api/flashcard
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { front, back, user_email } = body;

    if (!front || !back || !user_email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: StatusCode.BadRequest }
      );
    }

    const [created] = await db
      .insert(flashcards)
      .values({ front, back, user_email })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /flashcards error:", err);
    return NextResponse.json(
      { error: "Failed to create flashcard" },
      { status: StatusCode.InternalServerError }
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
