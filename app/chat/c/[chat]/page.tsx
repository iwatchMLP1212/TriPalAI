"use server";

import { primaryFont as beVietNamPro } from "@/lib/utils";
import { ApiEndpoints } from "@/lib/utils";
import { Conversation, Bot, User } from "@/types/drizzle-table";
import ChatHeader from "@/chat/bot/[name]/components/ChatHeader";
import ChatHistoryProvider from "@/chat/bot/[name]/ChatHistoryProvider";
import ChatBodyProvider from "@/chat/bot/[name]/ChatBodyProvider";

type Data = {
  conversations: Conversation;
  users: User;
  bots: Bot;
};

const getData = async (conversationSlug: string) => {
  const url = new URL(`${ApiEndpoints.Conversation}/slug/${conversationSlug}`);
  url.searchParams.append("includeUser", "true");
  url.searchParams.append("includeBot", "true");

  const response = await fetch(url);
  const data = await response.json();
  return data[0] as Data;
};

const Chat = async ({ params }: { params: Promise<{ chat: string }> }) => {
  const conversationSlug = (await params).chat;

  const data = await getData(conversationSlug);

  console.log(data);

  const userId = data.users.id;
  const conversationId = data.conversations.id;
  const botName = data.bots.name;
  const imageUrl = data.bots.image_url;

  return (
    <main className={`h-screen max-w-6xl mx-auto ${beVietNamPro.className}`}>
      <ChatHistoryProvider userId={userId} botName={botName} />
      <div className="flex flex-col h-full w-auto">
        <ChatHeader botName={botName} imageUrl={imageUrl} />
        <ChatBodyProvider conversationId={conversationId} />
      </div>
    </main>
  );
};

export default Chat;
