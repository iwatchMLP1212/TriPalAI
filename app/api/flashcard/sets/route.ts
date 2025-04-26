import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { flashcardSets } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (!email && !id) {
      return NextResponse.json(
        { error: "Missing email or id" },
        { status: 400 }
      );
    }

    if (id) {
      // Fetch by ID
      const set = await db
        .select()
        .from(flashcardSets)
        .where(eq(flashcardSets.id, parseInt(id, 10)))
        .limit(1);

      if (set.length === 0) {
        return NextResponse.json(
          { error: "Flashcard set not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(set[0]);
    }

    if (email) {
      // Fetch all by email
      const sets = await db
        .select()
        .from(flashcardSets)
        .where(eq(flashcardSets.user_email, email));

      return NextResponse.json(sets);
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (err) {
    console.error("GET /flashcards/sets error:", err);
    return NextResponse.json(
      { error: "Failed to fetch flashcard sets" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const deleted = await db
      .delete(flashcardSets)
      .where(eq(flashcardSets.id, parseInt(id)));

    return NextResponse.json({ success: true, deleted });
  } catch (err) {
    console.error("DELETE /flashcards/sets error:", err);
    return NextResponse.json(
      { error: "Failed to delete flashcard set" },
      { status: 500 }
    );
  }
}
