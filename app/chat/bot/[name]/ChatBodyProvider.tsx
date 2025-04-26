"use client";

import { FC } from "react";

import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import { MessageProvider } from "@/context/message";

import ChatBody from "./components/ChatBody";
import ChatFooterProvider from "./ChatFooterProvider";

interface ChatBodyProviderProps {
  conversationId: number;
  chatSlug: string;
  userPersonalityColor?: "blue" | "green" | "yellow" | "orange" | null;
}

const ChatBodyProvider: FC<ChatBodyProviderProps> = ({
  conversationId,
  chatSlug,
  userPersonalityColor,
}) => {
  return (
    <MessageProvider>
      <QueryClientProvider client={queryClient}>
        <ChatBody conversationId={conversationId} chatSlug={chatSlug} />
        {userPersonalityColor ? (
          <ChatFooterProvider
            conversationId={conversationId}
            userPersonalityColor={userPersonalityColor}
          />
        ) : (
          <ChatFooterProvider
            conversationId={conversationId}
            userPersonalityColor={"blue"}
          />
        )}
      </QueryClientProvider>
    </MessageProvider>
  );
};

export default ChatBodyProvider;
