"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "@/lib/queryClient";
import { FC } from "react";
import ChatHistory from "./components/ChatHistory";

export type ChatHistoryProps = {
  userId: number;
  botId: number;
  userName: string;
  imageUrl?: string;
};

const ChatHistoryProvider: FC<ChatHistoryProps> = ({
  userId,
  botId,
  userName,
  imageUrl,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ChatHistory
          userId={userId}
          botId={botId}
          userName={userName}
          imageUrl={imageUrl}
        />
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default ChatHistoryProvider;
