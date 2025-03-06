import { db } from "@/db/db";
import { bots } from "@/db/schema";
import { StatusCode } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const seletedBots = await db.select().from(bots);
    return NextResponse.json(seletedBots);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed fetching bots" },
      { status: StatusCode.InternalServerError }
    );
  }
};
