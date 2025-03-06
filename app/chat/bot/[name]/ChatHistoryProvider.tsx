"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "@/lib/queryClient";
import { FC } from "react";
import ChatHistory from "./components/ChatHistory";

type ChatHistoryProps = {
  userId: number;
  botName: string;
};

const ChatHistoryProvider: FC<ChatHistoryProps> = ({ userId, botName }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ChatHistory userId={userId} botName={botName} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default ChatHistoryProvider;
