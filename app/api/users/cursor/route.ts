import { db } from "@/db/db";
import { users } from "@/db/schema";
import { lte, gte, and } from "drizzle-orm";
import { StatusCode } from "@/lib/utils";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const startQuery = parseInt(searchParams.get("start") as string, 10);
  const endQuery = parseInt(searchParams.get("end") as string, 10);

  // Start number query need to be smaller than end number
  if (startQuery > endQuery) {
    return NextResponse.json(
      { error: "Start number need to be smaller than end number" },
      { status: StatusCode.BadRequest }
    );
  }

  try {
    const seletedUsers = await db
      .select()
      .from(users)
      // Use and() to query with multiple conditions
      .where(and(gte(users.id, startQuery), lte(users.id, endQuery)));
    return NextResponse.json(seletedUsers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: StatusCode.InternalServerError }
    );
  }
};
