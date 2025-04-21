import { db } from "@/db/db";
import { conversations, messages } from "@/db/schema";

import { StatusCode } from "@/lib/utils";
import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const selectedMessages = await db.select().from(conversations);
    return NextResponse.json(selectedMessages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed fetching conversations" },
      { status: StatusCode.InternalServerError }
    );
  }
};

export const POST = async (req: Request) => {
  const data = await req.json();
  const { name, user_id, bot_id, slug } = data;

  if (!name) {
    return NextResponse.json(
      { error: "Missing required field: name" },
      { status: StatusCode.BadRequest }
    );
  }

  try {
    const newConversation = await db.insert(conversations).values({
      name: name,
      slug: slug,
      user_id: user_id,
      bot_id: bot_id,
    });

    // Step 2: Query for the conversation's ID based on its slug
    const conversation = await db
      .select()
      .from(conversations)
      .where(eq(conversations.slug, slug))
      .limit(1);

    // Step 3: Get the conversation ID
    const conversationId = conversation[0]?.id;

    if (conversationId) {
      // Step 4: Insert the first message for the new conversation
      await db.insert(messages).values({
        conversation_id: conversationId,
        content: "Xin chào! Mình có thể giúp gì cho bạn hôm nay?",
        is_outgoing: false, // This is an incoming message (false)
      });

      return NextResponse.json(
        { message: "New conversation created:", newConversation },
        { status: StatusCode.OK }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating conversation" },
      { status: StatusCode.InternalServerError }
    );
  }
};
