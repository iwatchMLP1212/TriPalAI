import { db } from "@/db/db"; // Drizzle ORM setup
import { flashcardSets } from "@/db/schema"; // Your FlashcardSet schema/model
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// This is your API route handler for updating the flashcard set completion
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ setId: string }> }
) {
  const { setId } = await params;

  // Parse the incoming request body to extract 'is_completed'
  const { is_completed }: { is_completed: boolean } = await request.json();

  // Validate that 'is_completed' is indeed a boolean
  if (typeof is_completed !== "boolean") {
    return NextResponse.json(
      { message: "Invalid 'is_completed' value. Must be a boolean." },
      { status: 400 }
    );
  }

  try {
    // Update the flashcard set in the database using Drizzle ORM
    const updatedFlashcardSet = await db
      .update(flashcardSets)
      .set({ is_completed })
      .where(eq(flashcardSets.id, parseInt(setId)))
      .returning();

    // If no records were updated, the flashcard set was not found
    if (updatedFlashcardSet.length === 0) {
      return NextResponse.json(
        { message: `Flashcard set with ID ${setId} not found.` },
        { status: 404 }
      );
    }

    // Return the updated flashcard set as a response
    return NextResponse.json(updatedFlashcardSet[0]);
  } catch (error) {
    // Handle unexpected errors and log them
    console.error("❌ Failed to update flashcard set completion:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
