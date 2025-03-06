import { db } from "@/db/db";
import { conversations } from "@/db/schema";
import { StatusCode } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const selectedMessages = await db.select().from(conversations);
    return NextResponse.json(selectedMessages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed fetching conversations" },
      { status: StatusCode.InternalServerError }
    );
  }
};

// export const POST = async () => {
//   try {
//     const newConversation = await foo;
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Error creating conversation" },
//       { status: StatusCode.InternalServerError }
//     );
//   }
// };
