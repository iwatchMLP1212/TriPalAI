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
}

const ChatBodyProvider: FC<ChatBodyProviderProps> = ({
  conversationId,
  chatSlug,
}) => {
  return (
    <MessageProvider>
      <QueryClientProvider client={queryClient}>
        <ChatBody conversationId={conversationId} chatSlug={chatSlug} />
        <ChatFooterProvider conversationId={conversationId} />
      </QueryClientProvider>
    </MessageProvider>
  );
};

export default ChatBodyProvider;
