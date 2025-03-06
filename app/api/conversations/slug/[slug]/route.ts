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
