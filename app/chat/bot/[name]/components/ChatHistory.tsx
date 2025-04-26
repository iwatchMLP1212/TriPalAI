"use client";

import {
  History,
  EllipsisVertical,
  Plus,
  PenLine,
  LoaderCircle,
  Layers,
  LogOut,
  UserPen,
} from "lucide-react";

import { useState, FC } from "react";

import { ApiEndpoints } from "@/lib/utils";

import { Conversation } from "@/types/drizzle-table";

import { useRouter } from "next/navigation";
import Link from "next/link";

import axios from "axios";

import { useQuery } from "@tanstack/react-query";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { ChatHistoryProps } from "../ChatHistoryProvider";

import DesktopSidebar from "./DesktopSidebar";

import { useModifyConversation } from "@/lib/api/conversations/useModifyConversation";
import { queryClient } from "@/lib/queryClient";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

type History = {
  conversations: Conversation;
};

const fetchChatHistory = async (userId: number): Promise<History[]> => {
  const { data } = await axios.get(
    `${ApiEndpoints.Conversation}/user/${userId}`
  );
  return data;
};

const ChatHistory: FC<ChatHistoryProps> = ({
  userId,
  botId,
  userName,
  imageUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [newName, setNewName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const {
    mutate,
    isPending: isRenaming,
    error: renameError,
  } = useModifyConversation();

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

  const handleRename = async () => {
    if (!selectedConversation || !newName.trim()) return;

    mutate(
      {
        slug: selectedConversation.slug,
        updatedData: { name: newName },
      },
      {
        onSuccess: () => {
          setIsRenameOpen(false);
          setSelectedConversation(null);
          setNewName("");
          queryClient.invalidateQueries({ queryKey: ["chats", userId] });
        },
      }
    );
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
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedConversation(item.conversations);
                  setNewName(item.conversations.name);
                  setIsRenameOpen(true);
                }}
              >
                <Button
                  variant={"ghost"}
                  className="font-bold flex justify-center items-center gap-2 w-fit h-fit p-1"
                >
                  <PenLine size={16} />
                  Đổi tên
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
      {/* Rename Dialog */}
      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đổi tên đoạn chat</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2 mt-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nhập tên mới"
              className="mt-1"
            />
            {newName.trim() === "" && (
              <p className="text-sm text-red-500">Tên không được để trống.</p>
            )}
            {newName === selectedConversation?.name && (
              <p className="text-sm text-yellow-600">Tên chưa được thay đổi.</p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              onClick={handleRename}
              disabled={
                newName.trim() === "" || newName === selectedConversation?.name
              }
            >
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                <SheetTitle className="text-lg">Lịch sử đoạn chat</SheetTitle>
              </div>
            </SheetHeader>

            <Button className="mb-4 gap-2" onClick={() => router.push("/chat")}>
              <Plus className="h-4 w-4" />
              Đoạn chat mới
            </Button>

            <div className="px-2 mb-4">
              <Input
                placeholder="Tìm đoạn chat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="overflow-y-auto flex-1 px-2 pb-4">
              {renderHistory()}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Card className="w-full mx-auto p-3 border border-slate-300 shadow-md hover:shadow-xl transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={
                          imageUrl ||
                          "https://api.dicebear.com/9.x/glass/svg?seed=Amber"
                        }
                        alt="Avatar"
                        className="rounded-md"
                      />
                    </Avatar>
                    <span className="text-base font-medium">{userName}</span>
                  </div>
                </Card>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64 mx-2 mb-2">
                <Link href={"/flashcard"} className="w-full">
                  <Button variant={"ghost"} className="text-black w-full">
                    <Layers /> Flashcard
                  </Button>
                </Link>
                <Link href={"/character-test"} className="w-full">
                  <Button variant={"ghost"} className="text-black w-full">
                    <UserPen /> Kiểm tra tính cách
                  </Button>
                </Link>
                <Link href={"/signout"} className="w-full">
                  <Button variant={"ghost"} className="text-red-500 w-full">
                    <LogOut /> Đăng xuất
                  </Button>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <DesktopSidebar
        renderHistory={renderHistory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        userId={userId}
        botId={botId}
        userName={userName}
        imageUrl={imageUrl}
      />
    </>
  );
};

export default ChatHistory;
