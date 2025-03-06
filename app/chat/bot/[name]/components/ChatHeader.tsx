import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SettingButton from "./SettingButton";

const ChatHeader = ({
  botName,
  imageUrl,
}: {
  botName: string;
  imageUrl: string;
}) => {
  return (
    <header className="flex items-center border-b border-gray-300 justify-between p-4">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="p-2 text-black hover:bg-gray-200 transition-all rounded-full hidden xl:block"
        >
          <ArrowLeft size={24} />
        </Link>
        <div className="flex gap-2 items-center">
          <Avatar className="w-12 h-12">
            <AvatarImage src={imageUrl} />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-semibold">
            {botName ? botName : "Unkown bot"}
          </h1>
        </div>
      </div>
      <SettingButton />
    </header>
  );
};

export default ChatHeader;
