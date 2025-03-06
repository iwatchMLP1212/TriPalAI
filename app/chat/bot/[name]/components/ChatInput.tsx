import { forwardRef } from "react";

export type ChatInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  placeholder?: string;
  value: string;
  setInput: (value: string) => void;
};

const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  (
    {
      className,
      placeholder = "Type your message...",
      value,
      setInput,
      ...props
    },
    ref
  ) => {
    return (
      <input
        value={value} // Make it controlled
        onChange={(e) => setInput(e.target.value)}
        ref={ref}
        type="text"
        placeholder={placeholder}
        className={`
          w-full h-full
          px-4 py-2
          border border-gray-300
          bg-white shadow-sm
          placeholder-gray-500 text-gray-800
          focus:outline-none focus:ring-2 focus:ring-primary
          transition duration-200 ease-in-out
          rounded-full
          ${className || ""}
        `}
        {...props}
      />
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
