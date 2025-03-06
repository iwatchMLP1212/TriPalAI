"use client";

import { FC } from "react";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { MessageProvider } from "@/context/message";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";

type ChatBodyProviderProps = {
  conversationId: number;
};

const ChatBodyProvider: FC<ChatBodyProviderProps> = ({ conversationId }) => {
  return (
    <MessageProvider>
      <QueryClientProvider client={queryClient}>
        <ChatBody conversationId={conversationId} />
      </QueryClientProvider>
      <ChatFooter conversationId={conversationId} />
    </MessageProvider>
  );
};

export default ChatBodyProvider;
