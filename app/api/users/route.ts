import { db } from "@/db/db";
import { users } from "@/db/schema";
import { StatusCode } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const selectedUsers = await db.select().from(users);
    return NextResponse.json(selectedUsers);
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: StatusCode.InternalServerError }
    );
  }
};
