"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { Plus, X, Menu } from "lucide-react";

import { ApiEndpoints } from "@/lib/utils";

import { Conversation } from "@/types/drizzle-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CommandDialog,
  CommandGroup,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import axios from "axios";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

import { v4 as uuidv4 } from "uuid";

interface userData {
  name: string;
  user_id: number;
  bot_id: number;
  slug: string;
}

interface ResponseData {
  message: Conversation;
  status: number;
}

const createConversation = async (
  userData: userData
): Promise<ResponseData> => {
  console.log("Creating conversation with data:", userData);
  const response = await axios.post(ApiEndpoints.Conversation, userData);
  return response.data;
};

const DesktopSidebar = ({
  renderHistory,
  searchQuery,
  setSearchQuery,
  userId,
  botId,
  userName,
  imageUrl,
}: {
  renderHistory: () => React.ReactNode;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  userId: number;
  botId: number;
  userName: string;
  imageUrl?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sidebarOpen");
    if (stored !== null) {
      setSidebarOpen(stored === "true");
    }
  }, []);

  const router = useRouter();

  const conversationMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => {
      console.log("New conversation created:", data);
      router.push(`/chat/c/${uuid}`);
    },
    onError: (error) => {
      console.error("An error occured creating conversation:", error);
    },
  });

  useEffect(() => console.log(uuid), [uuid]);

  const handleNewConversation = (botIdParam: number) => {
    const newUuid = uuidv4();
    setUuid(newUuid);
    conversationMutation.mutate({
      name: `Trò chuyện mới`,
      user_id: userId,
      bot_id: botIdParam,
      slug: newUuid,
    });
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandList>
          <CommandGroup heading="Gợi ý">
            <Button
              className="flex justify-start w-full h-full py-4"
              variant={"ghost"}
              onClick={() => handleNewConversation(4)}
            >
              Toán Học
            </Button>
            <Button
              className="flex justify-start w-full h-full py-4"
              variant={"ghost"}
            >
              Ngữ Văn
            </Button>
            <Button
              className="flex justify-start w-full h-full py-4"
              variant={"ghost"}
            >
              Tiếng Anh
            </Button>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Gần đây">
            <Button
              className="flex justify-start w-full h-full py-4"
              variant={"ghost"}
            >
              Toán Học
            </Button>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <Button
        variant={"ghost"}
        className={`hidden lg:block fixed left-4 top-4 border bg-white hover:bg-gray-200 transition-all rounded-md z-50`}
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
          localStorage.setItem("sidebarOpen", JSON.stringify(!sidebarOpen));
        }}
      >
        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <div
        className={`${
          !sidebarOpen ? "-left-96" : "left-0"
        } hidden lg:block fixed left-0 top-0 h-screen w-72 border-r bg-background z-40 duration-300 transition-all`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="mb-6">
            <div className="flex justify-end items-center mb-4 p-2">
              <h2 className="text-xl font-semibold">Lịch sử trò chuyện</h2>
            </div>
            <Button
              className="w-full gap-2"
              onClick={() => {
                // handleNewConversation(botId);
                setOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Đoạn chat mới
            </Button>
          </div>

          <div className="mb-4">
            <Input
              placeholder="Tìm đoạn chat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg"
            />
          </div>

          <div className="overflow-y-auto flex-1 pb-4">{renderHistory()}</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Card className="sticky left-0 bottom-4 w-11/12 mx-auto p-3 border border-slate-300 shadow-md hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={
                      imageUrl
                        ? imageUrl
                        : "https://api.dicebear.com/9.x/glass/svg?seed=Amber"
                    }
                    alt="Avatar"
                    className="w-full h-full"
                  />
                </Avatar>
                <span className="text-base font-medium">{userName}</span>
              </div>
            </Card>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="flex flex-col justify-center items-center">
            <Button variant={"ghost"} className="text-black w-full">
              <Link href={"/character-test"}>Kiểm tra tính cách</Link>
            </Button>
            <Button variant={"ghost"} className="text-red-500 w-full">
              <Link href={"/signout"}>Đăng xuất</Link>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DesktopSidebar;
