import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { conversations, messages } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ "conv-slug": string }> }
) {
  const slug = (await params)["conv-slug"];
  if (!slug)
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const { searchParams } = new URL(req.url);
  const returnOnlyContent = searchParams.get("returnOnlyContent") === "true";

  try {
    const conv = await db
      .select({ id: conversations.id })
      .from(conversations)
      .where(eq(conversations.slug, slug))
      .limit(1);

    if (!conv.length)
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );

    let msgs;

    if (returnOnlyContent) {
      msgs = await db
        .select({ content: messages.content })
        .from(messages)
        .where(eq(messages.conversation_id, conv[0].id))
        .orderBy(messages.timestamp);
    } else {
      msgs = await db
        .select()
        .from(messages)
        .where(eq(messages.conversation_id, conv[0].id))
        .orderBy(messages.timestamp);
    }

    return NextResponse.json(msgs);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
