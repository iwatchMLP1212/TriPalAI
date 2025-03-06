import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Be_Vietnam_Pro, Lora } from "next/font/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const primaryFont = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export enum ApiEndpoints {
  Message = "http://localhost:3000/api/messages",
  AiResponse = "http://127.0.0.1:8000/response/",
  Bot = "http://localhost:3000/api/bots",
  User = "http://localhost:3000/api/users",
  Conversation = "http://localhost:3000/api/conversations",
}

export enum StatusCode {
  OK = 200,
  BadRequest = 400,
  InternalServerError = 500,
  // There are more to add
}
