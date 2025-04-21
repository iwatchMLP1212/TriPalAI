import { db } from "@/db/db";
import { conversations, messages } from "@/db/schema";
import { eq, and, desc, lt, asc } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { StatusCode } from "@/lib/utils";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ conv_id: string }> }
) => {
  // Conversation ID
  const convId = parseInt((await params).conv_id, 10);

  if (!params || !convId) {
    return NextResponse.json(
      {
        error: "Missing conv_id param",
      },
      { status: StatusCode.BadRequest }
    );
  }

  try {
    const latestPage = await db
      .select({ id: messages.id })
      .from(messages)
      .where(eq(messages.conversation_id, convId))
      .orderBy(desc(messages.id))
      .limit(1);

    if (latestPage.length === 0) {
      return NextResponse.json({ latest_page: null });
    }

    return NextResponse.json({ latest_page: latestPage[0].id ?? null });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching messages" },
      { status: StatusCode.InternalServerError }
    );
  }
};
