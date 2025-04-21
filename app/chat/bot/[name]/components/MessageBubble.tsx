import {
  Clipboard,
  MessageSquareQuote,
  Reply,
  RectangleEllipsis,
  RotateCcw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ERROR_MESSAGE } from "../ChatFooterProvider";

type MessageBubbleProps = {
  children: string;
  outgoing?: boolean;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  children,
  outgoing = true,
}) => {
  const isErrorMessage = children === ERROR_MESSAGE;
  return (
    <>
      <div
        className={`xl:max-w-[70%] md:max-w-full whitespace-break-spaces p-4 rounded-lg shadow ${
          isErrorMessage && "bg-red-500 text-white"
        } ${
          outgoing
            ? "bg-primary text-white self-end"
            : "bg-white text-card-foreground self-start"
        }`}
      >
        <p>{children}</p>
      </div>
      {!outgoing && (
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 transition-all rounded-full w-fit">
            <Clipboard size={15} />
          </button>
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 transition-all rounded-full w-fit outline-none">
              <MessageSquareQuote size={15} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex gap-2 text-center cursor-pointer font-semibold text-black/75 hover:text-black">
                <RectangleEllipsis />
                Nói thêm
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2 text-center cursor-pointer font-semibold text-black/75 hover:text-black">
                <Reply />
                Giải thích
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 transition-all rounded-full w-fit">
            <RotateCcw size={15} />
          </button> */}
        </div>
      )}
    </>
  );
};

export default MessageBubble;
