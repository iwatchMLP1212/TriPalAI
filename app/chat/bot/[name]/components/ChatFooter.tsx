"use client";

import { FC } from "react";
import { useState } from "react";
import { useMessageContext } from "@/context/message";
import { Send } from "lucide-react";
import { ApiEndpoints } from "@/lib/utils";
import ChatInput from "./ChatInput";
import axios from "axios";

type ChatFooterProps = {
  conversationId: number;
};

const ChatFooter: FC<ChatFooterProps> = ({ conversationId }) => {
  const [input, setInput] = useState("");

  const { sendMessage, setSendingState, isSending } = useMessageContext();

  type ResponseData = { response: string };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      setInput("");

      // User message
      sendMessage({
        content: message,
        outgoing: true,
      });

      axios
        .post(`${ApiEndpoints.Message}`, {
          conversationId: conversationId,
          message: message,
          isOutgoing: true,
        })
        .then((res) => console.log("New message created:", res))
        .catch((err) => console.error("Error creating message:", err));

      setSendingState("SET_MESSAGE_SENDING");

      // Get AI response
      const response = await axios.post(ApiEndpoints.AiResponse, { message });
      const responseData = response.data as ResponseData;

      setSendingState("SET_MESSAGE_SENT");

      // Send AI message
      sendMessage({
        content: responseData.response,
        outgoing: false,
      });

      axios
        .post(`${ApiEndpoints.Message}`, {
          conversationId: conversationId,
          message: responseData.response,
          isOutgoing: false,
        })
        .then((res) => console.log("New message created:", res))
        .catch((err) => console.error("Error creating message:", err));

      console.log("Server Response:", responseData);
      return responseData;
    } catch (error: any) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!isSending) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (!input.trim()) return;
        await handleSendMessage(input);
      }
    }
  };

  const onSendButtonClick = async () => {
    if (!isSending) {
      if (!input.trim()) return;
      await handleSendMessage(input);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 mb-4 border-t border-gray-300">
        <ChatInput
          className="flex-1 mr-4"
          placeholder="Hỏi A.I"
          setInput={setInput}
          value={input}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`p-2 text-primary hover:bg-gray-200 transition-all rounded-full ${
            isSending ? "cursor-default" : "cursor-pointer"
          }`}
          onClick={onSendButtonClick}
          disabled={!input.trim()}
        >
          <Send size={24} className={`${isSending && "text-secondary"}`} />
        </button>
      </div>
      <p className="text-sm text-secondary text-center mb-12">
        Lưu ý: AI có thể mắc lỗi, hãy kiểm tra lại kết quả.
      </p>
    </>
  );
};

export default ChatFooter;
