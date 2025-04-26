import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { StatusCode } from "@/lib/utils";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) => {
  const emailParam = (await params).email;

  if (!params || !emailParam) {
    return NextResponse.json(
      { error: "Email parameter is missing" },
      { status: StatusCode.BadRequest }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const getOnlyId = searchParams.get("getOnlyId") as string;

  const decodedEmailParam = decodeURIComponent(emailParam);

  const defaultSelection = {
    id: users.id,
    name: users.name,
    email: users.email,
    image_url: users.image_url,
    personality_coflor: users.personality_color,
  };

  try {
    const selectedUser = await db
      .select({
        ...(getOnlyId === "true" ? { id: users.id } : defaultSelection),
      })
      .from(users)
      .where(eq(users.email, decodedEmailParam));

    return NextResponse.json(selectedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: StatusCode.InternalServerError }
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) => {
  const { email: emailParam } = await params;

  if (!emailParam) {
    return NextResponse.json(
      { error: "Email parameter is missing" },
      { status: StatusCode.BadRequest }
    );
  }

  const decodedEmailParam = decodeURIComponent(emailParam);

  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: StatusCode.BadRequest }
    );
  }

  const { personality_color } = body;

  if (!personality_color) {
    return NextResponse.json(
      { error: "Missing personality_color in request body" },
      { status: StatusCode.BadRequest }
    );
  }

  try {
    const updateResult = await db
      .update(users)
      .set({ personality_color })
      .where(eq(users.email, decodedEmailParam))
      .returning({
        id: users.id,
        email: users.email,
        personality_color: users.personality_color,
      });

    if (updateResult.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: StatusCode.NotFound }
      );
    }

    return NextResponse.json(updateResult[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update personality_color" },
      { status: StatusCode.InternalServerError }
    );
  }
};
