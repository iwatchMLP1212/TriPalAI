// lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const checkIfUserExists = async (email: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user.length > 0;
  } catch (error) {
    return "Failed fetching user";
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/app/signin",
    signOut: "/app/signout",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        console.log("Sign-in attempt without email.");
        return false;
      }

      try {
        const isUserExists = await checkIfUserExists(user.email as string);
        if (!isUserExists) {
          await db.insert(users).values({
            name: user.name || "Unknown",
            email: user.email as string,
          });
        }
        console.log("New user added:", user.email);
      } catch (error) {
        console.error("Failed creating new user:", error);
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};
