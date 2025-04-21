// lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/db/db";
import { users } from "@/db/schema";

import { eq } from "drizzle-orm";

import { getRandomNumber } from "./utils";

const images = [
  "Aidan",
  "Avery",
  "Sawyer",
  "Liliana",
  "Easton",
  "Caleb",
  "Eliza",
  "Jocelyn",
  "Jade",
  "Alexander",
  "Valentina",
  "Vivian",
  "Brooklynn",
  "Sadie",
  "Brian",
  "Jessica",
  "Leah",
  "Wyatt",
  "Mason",
  "Christopher",
];

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
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "http://192.168.1.9:3000/app/signin",
    signOut: "http://192.168.1.9:3000/app/signout",
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
            image_url: `https://api.dicebear.com/9.x/glass/svg?seed=${
              images[getRandomNumber(0, images.length - 1)]
            }`,
          });
        }
      } catch (error) {
        console.error("Failed creating new user:", error);
        return false;
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
      // First login only — store image from Google
      if (account && profile) {
        token.picture = (profile as any).picture;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub as string;
      }
      if (token.picture) {
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
};
