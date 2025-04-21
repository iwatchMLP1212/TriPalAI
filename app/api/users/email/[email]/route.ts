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
