import { db } from "@/db/db";
import { bots } from "@/db/schema";
import { StatusCode } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = parseInt((await params).id, 10);

    if (!params || !(await params).id) {
      return NextResponse.json(
        { error: "Missing name parameter" },
        { status: StatusCode.BadRequest }
      );
    }

    const seletedBots = await db
      .select()
      .from(bots)
      .where(eq(bots.id, id))
      .limit(1);

    return NextResponse.json(seletedBots);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed fetching bots" },
      { status: StatusCode.InternalServerError }
    );
  }
};
