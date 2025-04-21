import { db } from "@/db/db";
import { messages } from "@/db/schema";
import { eq, and, desc, lte, gt } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { StatusCode } from "@/lib/utils";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ conv_id: string }> }
) => {
  // Conversation ID
  const convId = parseInt((await params).conv_id, 10);

  const searchParams = req.nextUrl.searchParams;
  const cursor = parseInt(searchParams.get("cursor") as string, 10);
  const pageSize = parseInt(searchParams.get("pageSize") as string, 10) || 20;
  const reverse = searchParams.get("reverse") === "true";

  try {
    const query = await db
      .select({
        id: messages.id,
        content: messages.content,
        is_outgoing: messages.is_outgoing,
        timestamp: messages.timestamp,
      })
      .from(messages)
      .where(
        cursor
          ? and(eq(messages.conversation_id, convId), lte(messages.id, cursor))
          : eq(messages.conversation_id, convId)
      )
      .orderBy(desc(messages.timestamp))
      .limit(pageSize);

    const selectedMessages = await query;

    // Find next cursor
    const nextCursor = selectedMessages.length ? selectedMessages[0].id : null;
    const prevCursor = selectedMessages.length
      ? selectedMessages[selectedMessages.length - 1].id - 1
      : null;

    if (reverse) {
      return NextResponse.json({
        message: selectedMessages.reverse(),
        nextCursor,
        prevCursor,
      });
    }

    return NextResponse.json({
      message: selectedMessages,
      nextCursor,
      prevCursor,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching messages" },
      { status: StatusCode.InternalServerError }
    );
  }
};
