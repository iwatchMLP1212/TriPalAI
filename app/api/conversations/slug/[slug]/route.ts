import { db } from "@/db/db";
import { bots, conversations, users } from "@/db/schema";
import { StatusCode } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  if (!params || !(await params).slug) {
    return NextResponse.json(
      { error: "Missing slug parameter" },
      { status: StatusCode.BadRequest }
    );
  }

  const conversationSlug = decodeURIComponent((await params).slug);
  const searchParams = req.nextUrl.searchParams;
  const includeUser = searchParams.get("includeUser") === "true";
  const includeBot = searchParams.get("includeBot") === "true";

  try {
    let query: any = db
      .select()
      .from(conversations)
      .where(eq(conversations.slug, conversationSlug));

    if (includeUser) {
      query = query.innerJoin(users, eq(conversations.user_id, users.id));
    }

    if (includeBot) {
      query = query.innerJoin(bots, eq(conversations.bot_id, bots.id));
    }

    const selectedConversation = await query;

    return NextResponse.json(selectedConversation);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching conversation" },
      { status: StatusCode.InternalServerError }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const slug = await params;
  if (!slug || !slug.slug) {
    return NextResponse.json(
      { error: "Missing slug parameter" },
      { status: StatusCode.BadRequest }
    );
  }

  const conversationSlug = decodeURIComponent(slug.slug);

  try {
    const result = await db
      .delete(conversations)
      .where(eq(conversations.slug, conversationSlug));

    return NextResponse.json(
      {
        message: "Conversation deleted successfully",
      },
      { status: StatusCode.OK }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete conversation" },
      { status: StatusCode.InternalServerError }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const slug = await params;
  if (!slug || !slug.slug) {
    return NextResponse.json(
      { error: "Missing slug parameter" },
      { status: StatusCode.BadRequest }
    );
  }

  const conversationSlug = decodeURIComponent(slug.slug);

  // Parse the body to get the updated conversation data
  let updatedData;
  try {
    updatedData = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: StatusCode.BadRequest }
    );
  }

  // Validate that the necessary fields exist in the body
  if (!updatedData || !updatedData.name) {
    return NextResponse.json(
      { error: "Missing required fields (e.g., 'name')" },
      { status: StatusCode.BadRequest }
    );
  }

  // Ensure the slug cannot be changed (it's part of the URL and not the body)
  const { name, user_id, bot_id } = updatedData;

  // Validate user_id and bot_id
  if (user_id && !Number.isInteger(user_id)) {
    return NextResponse.json(
      { error: "Invalid user_id" },
      { status: StatusCode.BadRequest }
    );
  }

  if (bot_id && !Number.isInteger(bot_id)) {
    return NextResponse.json(
      { error: "Invalid bot_id" },
      { status: StatusCode.BadRequest }
    );
  }

  try {
    // Fetch the existing conversation by its slug
    const existingConversation = await db
      .select()
      .from(conversations)
      .where(eq(conversations.slug, conversationSlug))
      .limit(1);

    if (!existingConversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: StatusCode.NotFound }
      );
    }

    // Update the conversation in the database
    const updatedConversation = await db
      .update(conversations)
      .set({
        name, // Update the name field
        user_id, // Update user_id (if provided)
        bot_id, // Update bot_id (if provided)
        last_open: new Date(), // Optionally update last_open to the current time
      })
      .where(eq(conversations.slug, conversationSlug));

    return NextResponse.json(
      { message: "Conversation updated successfully", updatedConversation },
      { status: StatusCode.OK }
    );
  } catch (error) {
    console.error("Error modifying conversation:", error);
    return NextResponse.json(
      { error: "Failed to update conversation" },
      { status: StatusCode.InternalServerError }
    );
  }
};
