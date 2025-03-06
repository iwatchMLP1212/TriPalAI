import { db } from "@/db/db";
import { messages } from "@/db/schema";
import { StatusCode } from "@/lib/utils";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const selectedMessages = await db.select().from(messages);
    return NextResponse.json(selectedMessages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed fetching conversations" },
      { status: StatusCode.InternalServerError }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { conversationId, isOutgoing, message } = body;

    if (!conversationId || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: StatusCode.BadRequest }
      );
    }

    const newMessage = await db.insert(messages).values({
      content: message,
      conversation_id: conversationId,
      is_outgoing: isOutgoing,
    });

    return NextResponse.json(
      { message: "New message created:", newMessage },
      { status: StatusCode.OK }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating message" },
      { status: StatusCode.InternalServerError }
    );
  }
};
