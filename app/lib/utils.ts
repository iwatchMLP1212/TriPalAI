import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { IBM_Plex_Sans, Lora } from "next/font/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const primaryFont = IBM_Plex_Sans({
  variable: "--font-primary",
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

// export enum ApiEndpoints {
//   Message = "http://192.168.1.9:3000/api/messages",
//   AiResponse = "http://192.168.1.9:8000/response/",
//   Bot = "http://192.168.1.9:3000/api/bots",
//   User = "http://192.168.1.9:3000/api/users",
//   Conversation = "http://192.168.1.9:3000/api/conversations",
// }

export enum Routes {
  localHost = "http://localhost:3000",
  prodcution = "",
  networkHost = "http://192.168.1.9:3000",
}

export enum StatusCode {
  OK = 200,
  BadRequest = 400,
  InternalServerError = 500,
  // There are more to add
}

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomNumbers = (
  min: number,
  max: number,
  length: number
): number[] => {
  const numbers: number[] = [];
  while (numbers.length < length) {
    const randomNumber = getRandomNumber(min, max);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
};
