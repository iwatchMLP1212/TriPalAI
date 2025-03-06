import { db } from "@/db/db";
import { bots } from "@/db/schema";
import { StatusCode } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ name: string }> }
) => {
  try {
    const name = (await params).name;

    if (!params || !name) {
      return NextResponse.json(
        { error: "Missing name parameter" },
        { status: StatusCode.BadRequest }
      );
    }

    const decodedName = decodeURIComponent(name);

    const seletedBots = await db
      .select()
      .from(bots)
      .where(eq(bots.name, decodedName));

    return NextResponse.json(seletedBots);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed fetching bots" },
      { status: StatusCode.InternalServerError }
    );
  }
};
