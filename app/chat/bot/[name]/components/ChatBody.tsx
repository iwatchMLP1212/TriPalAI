"use client";

import { FC } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { ApiEndpoints } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useMessageContext } from "@/context/message";
import { Message } from "@/types/message";
import { Message as DrizzleMessage } from "@/types/drizzle-table";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import SendingChatBubble from "./SendingChatBubble";

type ChatBodyProps = {
  conversationId: number;
};

type MessageResponse = {
  message: DrizzleMessage[];
  nextCursor: number;
};

const fetchMessages = async (
  conversationId: number,
  nextCursor: number
): Promise<MessageResponse> => {
  const { data } = await axios.get<MessageResponse>(
    `${ApiEndpoints.Message}/conv_id/${conversationId}`,
    {
      params: {
        reverse: "true",
        nextCursor: nextCursor,
      },
    }
  );
  return data;
};

const ChatBody: FC<ChatBodyProps> = ({ conversationId }) => {
  const { messages, isSending } = useMessageContext();
  const { data, error, isLoading } = useQuery<MessageResponse>({
    queryKey: ["messages", conversationId] as const,
    queryFn: () => fetchMessages(conversationId),
    enabled: !!conversationId,
    staleTime: 1000,
  });

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, data]);

  useEffect(() => console.log(data), [data]);

  const chatRef = useRef<HTMLDivElement>(null);

  if (isLoading) return <div className="h-screen" />;
  if (error) return <p>Error: {error.message}</p>;

  const mapFetchedMessages = data?.message.map((message) => (
    <MessageBubble outgoing={message.is_outgoing} key={message.id}>
      {message.content}
    </MessageBubble>
  ));

  return (
    <div
      className="h-screen py-8 px-4 space-y-3 overflow-y-auto flex flex-col"
      ref={chatRef}
    >
      {mapFetchedMessages}
      {messages.map((message: Message, idx: number) => (
        <MessageBubble outgoing={message.outgoing} key={idx}>
          {message.content}
        </MessageBubble>
      ))}
      {isSending && <SendingChatBubble />}
    </div>
  );
};

export default ChatBody;
