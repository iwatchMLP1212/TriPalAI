"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { queryClient } from "@/lib/queryClient";
import { ApiEndpoints } from "@/lib/utils";

import {
  FC,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";

import { useMessageContext } from "@/context/message";

import { Message } from "@/types/types";
import { Message as DrizzleMessage } from "@/types/drizzle-table";

import axios from "axios";

import MessageBubble from "./MessageBubble";
import SendingChatBubble from "./SendingChatBubble";

type ChatBodyProps = {
  conversationId: number;
  chatSlug: string;
};

type MessageResponse = {
  message: DrizzleMessage[];
  nextCursor: number;
  prevCursor: number;
};

type LatestMessageIdResponse = { latest_page: number };

const fetchMessages = async (
  conversationId: number,
  pageParam: number
): Promise<MessageResponse> => {
  const { data } = await axios.get<MessageResponse>(
    `${ApiEndpoints.Message}/conv_id/${conversationId}?reverse=true&cursor=${pageParam}`
  );
  return data;
};

const useLatestMessageId = (conversationId: number) => {
  const { data } = useQuery({
    queryKey: ["latestMessageId", conversationId],
    queryFn: async () => {
      const { data } = await axios.get<LatestMessageIdResponse>(
        `${ApiEndpoints.Message}/latest-page/${conversationId}`
      );
      return data;
    },
    enabled: !!conversationId,
    refetchOnWindowFocus: false,
  });
  return data?.latest_page;
};

const ChatBody: FC<ChatBodyProps> = ({ conversationId, chatSlug }) => {
  const { messages, isSending } = useMessageContext();
  const latestMessageId = useLatestMessageId(conversationId);

  const {
    data,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    refetch,
    status,
  } = useInfiniteQuery({
    queryKey: ["messages", conversationId],
    queryFn: ({ pageParam = 0 }) => fetchMessages(conversationId, pageParam),
    initialPageParam: latestMessageId ?? 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor ?? undefined,
    staleTime: 0,
    enabled: !!latestMessageId,
    refetchOnWindowFocus: false,
  });

  // Force refetch when conversationId or chatSlug changes
  useEffect(() => {
    if (!latestMessageId) return;
    queryClient.removeQueries({ queryKey: ["messages", conversationId] });
    refetch();
  }, [conversationId, chatSlug, latestMessageId, refetch]);

  const chatRef = useRef<HTMLDivElement>(null);
  const didInitialScroll = useRef(false);
  const [isLoadingMoreHistory, setIsLoadingMoreHistory] = useState(false);

  const handleScroll = useCallback(() => {
    const el = chatRef.current;
    if (!el) return;
    if (el.scrollTop === 0 && hasPreviousPage && !isFetchingPreviousPage) {
      setIsLoadingMoreHistory(true);
      fetchPreviousPage();
    }
  }, [hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage]);

  useLayoutEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => void el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Initial data load: scroll once when pages arrive
  useLayoutEffect(() => {
    const el = chatRef.current;
    if (!el || !data || isFetchingPreviousPage || didInitialScroll.current)
      return;

    el.scrollTo({ top: el.scrollHeight });
    didInitialScroll.current = true;
  }, [data, isFetchingPreviousPage]);

  // After loading older pages, scroll down slightly so user can fetch more
  useLayoutEffect(() => {
    const el = chatRef.current;
    if (!el || isFetchingPreviousPage || !isLoadingMoreHistory) return;

    el.scrollBy({ top: 1300 });
    setIsLoadingMoreHistory(false);
  }, [isFetchingPreviousPage, isLoadingMoreHistory]);

  // New messages: scroll only if user is near bottom
  useLayoutEffect(() => {
    const el = chatRef.current;
    if (!el || !didInitialScroll.current || isFetchingPreviousPage) return;

    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    if (isNearBottom) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isFetchingPreviousPage]);

  if (status === "pending") return <div className="h-screen" />;
  if (status === "error") return <p>Error loading messages.</p>;

  const mapFetchedMessages =
    data?.pages.flatMap((page) =>
      page.message.map((msg) => (
        <MessageBubble outgoing={msg.is_outgoing} key={msg.id}>
          {msg.content}
        </MessageBubble>
      ))
    ) ?? [];

  console.log("Client messages:", messages);

  return (
    <div
      className="h-screen py-8 px-4 space-y-3 overflow-y-auto flex flex-col"
      ref={chatRef}
    >
      {mapFetchedMessages}
      {messages.map((message: Message, idx) => (
        <MessageBubble outgoing={message.outgoing} key={`lcl-msg-${idx}`}>
          {message.content}
        </MessageBubble>
      ))}
      {isSending && <SendingChatBubble />}
    </div>
  );
};

export default ChatBody;
