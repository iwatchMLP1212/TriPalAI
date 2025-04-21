"use client";

import { Button } from "@/components/ui/button";

interface MessageHintProps {
  children: string;
  handleSendMessage: (message: string) => void;
}

const MessageHint: React.FC<MessageHintProps> = ({
  children,
  handleSendMessage,
}) => {
  const handleOnClick = () => {
    handleSendMessage(children);
  };

  return (
    <Button
      onClick={handleOnClick}
      variant="outline"
      size="sm"
      className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200
        hover:bg-primary/10 hover:text-primary hover:border-primary/50
        active:scale-95 border border-muted-foreground/30 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        shadow-sm hover:shadow"
      title={children}
    >
      {children}
    </Button>
  );
};

export default MessageHint;
