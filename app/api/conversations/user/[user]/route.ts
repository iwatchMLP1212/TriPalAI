import { db } from "@/db/db";
import { conversations, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { StatusCode } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ user: string }> }
) => {
  try {
    const userId = parseInt((await params).user, 10);

    const selectedConveration = await db
      .select({ conversations })
      .from(users)
      .rightJoin(conversations, eq(users.id, conversations.user_id))
      .where(eq(users.id, userId));
    return NextResponse.json(selectedConveration);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching data" },
      { status: StatusCode.InternalServerError }
    );
  }
};
