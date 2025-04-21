"use client";

import MessageHint from "./MessageHint";

const MessageHintContainer = ({
  hints,
  handleSendMessage,
}: {
  hints: string[];
  handleSendMessage: (message: string) => void;
}) => {
  return (
    <div className="flex items-center gap-3 pb-2 bg-[#ffffff00] overflow-x-scroll min-h-fit">
      {hints.map((hint, index) => (
        <MessageHint handleSendMessage={handleSendMessage} key={index}>
          {hint}
        </MessageHint>
      ))}
    </div>
  );
};

export default MessageHintContainer;
