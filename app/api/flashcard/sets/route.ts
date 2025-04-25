import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { flashcardSets } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const sets = await db
      .select()
      .from(flashcardSets)
      .where(eq(flashcardSets.user_email, email));

    return NextResponse.json(sets);
  } catch (err) {
    console.error("GET /flashcards/sets error:", err);
    return NextResponse.json(
      { error: "Failed to fetch flashcard sets" },
      { status: 500 }
    );
  }
}
