"use client";

import { FC } from "react";

import { Send } from "lucide-react";

import ChatInput from "./ChatInput";

interface ChatFooterProps {
  input: string;
  setInput: (value: string) => void;
  isSending: boolean;
  handleSendMessage: (message: string) => void;
}

const ChatFooter: FC<ChatFooterProps> = ({
  input,
  setInput,
  isSending,
  handleSendMessage,
}) => {
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
