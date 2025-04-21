import { useState } from "react";

import { useMessageContext } from "@/context/message";

import { ApiEndpoints } from "@/lib/utils";

import { useMutation } from "@tanstack/react-query";

import { ParsedMessageServerResponse } from "@/types/types";

import axios from "axios";

import MessageHintContainer from "./components/MessageHintContainer";
import ChatFooter from "./components/ChatFooter";

interface ChatFooterProviderProps {
  conversationId: number;
}

export const ERROR_MESSAGE = "Đang gặp lỗi, vui lòng thử lại sau.";

const postMessage = async ({
  message,
  conversationId,
  isOutgoing,
}: {
  message: string;
  conversationId: number;
  isOutgoing: boolean;
}) => {
  axios
    .post(`${ApiEndpoints.Message}`, {
      conversationId: conversationId,
      message: message,
      isOutgoing: isOutgoing,
    })
    .then((res) => console.log("New message created:", res))
    .catch((err) => console.error("Error creating message:", err));
};

const getBotResponse = async (message: string) => {
  // Get AI response
  const response = await axios.post(ApiEndpoints.AiResponse, { message });
  return response.data as ParsedMessageServerResponse;
};

const ChatFooterProvider: React.FC<ChatFooterProviderProps> = ({
  conversationId,
}) => {
  const [input, setInput] = useState("");
  const [hints, setHints] = useState<string[]>([]);

  const messageMutation = useMutation({
    mutationFn: postMessage,
    onSuccess: (data) => {
      console.log("New message created:", data);
    },
    onError: (error) => {
      console.error("An error occured creating message:", error);
    },
  });

  const { sendMessage, setSendingState, isSending } = useMessageContext();

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      setHints([]);

      // User message
      sendMessage({
        content: message,
        outgoing: true,
      });

      setInput("");

      messageMutation.mutate({
        message: message,
        conversationId: conversationId,
        isOutgoing: true,
      });

      setSendingState("SET_MESSAGE_SENDING");

      const AI_RESPONSE: ParsedMessageServerResponse = await getBotResponse(
        message
      );

      console.log(AI_RESPONSE);

      // Send AI message
      sendMessage({
        content: AI_RESPONSE.response.answer,
        outgoing: false,
      });

      setSendingState("SET_MESSAGE_SENT");

      if (AI_RESPONSE.response.answer) {
        setHints(AI_RESPONSE.response.suggest);
      }

      messageMutation.mutate({
        message: AI_RESPONSE.response.answer,
        conversationId: conversationId,
        isOutgoing: false,
      });
    } catch (error: any) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <>
      <MessageHintContainer
        handleSendMessage={handleSendMessage}
        hints={hints}
      />
      <ChatFooter
        input={input}
        setInput={setInput}
        isSending={isSending}
        handleSendMessage={handleSendMessage}
      />
    </>
  );
};

export default ChatFooterProvider;
