"use client";

import {
  History,
  X,
  EllipsisVertical,
  Plus,
  Trash2,
  PenLine,
  LoaderCircle,
} from "lucide-react";
import { useState, FC } from "react";
import { ApiEndpoints } from "@/lib/utils";
import { Conversation } from "@/types/drizzle-table";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DesktopSidebar from "./DesktopSidebar";

type History = {
  conversations: Conversation;
};

type ChatHistoryProps = {
  userId: number;
  botName: string;
};

const fetchChatHistory = async (userId: number): Promise<History[]> => {
  const { data } = await axios.get(
    `${ApiEndpoints.Conversation}/user/${userId}`
  );
  return data;
};

const ChatHistory: FC<ChatHistoryProps> = ({ userId, botName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ["chats", userId],
    queryFn: () => fetchChatHistory(userId),
  });

  const filteredData = data?.filter((item) =>
    item.conversations.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const redirectToChatPage = (chatSlug: string) => {
    router.push(`/chat/c/${chatSlug}`);
    setIsOpen(false);
  };

  const renderHistory = () => {
    if (isLoading) {
      return (
        <div className="w-full flex justify-center">
          <LoaderCircle
            strokeWidth={1.25}
            size={42}
            className="animate-spin text-secondary"
          />
        </div>
      );
    }

    if (error) {
      return <Alert variant="destructive">Không thể mở đoạn chat này.</Alert>;
    }

    if (!filteredData || filteredData.length === 0) {
      return (
        <p className="text-sm text-muted-foreground text-center py-4">
          Bạn không có lịch sử trò chuyện.
        </p>
      );
    }

    return filteredData?.map((item) => (
      <Card
        key={item.conversations.id}
        className="p-2 mb-2 hover:bg-accent/50 transition-colors group cursor-pointer"
        onClick={() => redirectToChatPage(item.conversations.slug)}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium line-clamp-1">
            {item.conversations.name}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <EllipsisVertical className="text-neutral-400 hover:text-black h-6 w-6 p-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button
                  variant={"ghost"}
                  className="font-bold flex justify-center items-center gap-2 w-fit h-fit p-1"
                >
                  <PenLine size={16} />
                  Đổi tên
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant={"ghost"}
                  className="text-red-500 font-bold flex justify-center items-center gap-2 w-fit h-fit p-1"
                >
                  <Trash2 size={16} />
                  Xoá trò chuyện
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    ));
  };

  return (
    <>
      {/* Mobile Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-50 lg:hidden"
          >
            <History className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-4 h-full flex flex-col">
            <SheetHeader className="mb-4">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-lg">Chat History</SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </SheetHeader>

            <Button className="mb-4 gap-2" onClick={() => router.push("/chat")}>
              <Plus className="h-4 w-4" />
              Đoạn chat mới
            </Button>

            <div className="px-2 mb-4">
              <Input
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="overflow-y-auto flex-1 px-2 pb-4">
              {renderHistory()}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <DesktopSidebar
        renderHistory={renderHistory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default ChatHistory;
