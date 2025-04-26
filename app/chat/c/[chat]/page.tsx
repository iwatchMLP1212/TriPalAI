"use server";

import { primaryFont as beVietNamPro } from "@/lib/utils";
import { ApiEndpoints } from "@/lib/utils";

import { Conversation, Bot, User } from "@/types/drizzle-table";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOption";

import { Suspense } from "react";

import ChatHeader from "@/chat/bot/[name]/components/ChatHeader";
import ChatHistoryProvider from "@/chat/bot/[name]/ChatHistoryProvider";
import ChatBodyProvider from "@/chat/bot/[name]/ChatBodyProvider";
import RestrictedContent from "@/components/RestrictedContent";

type Data = {
  conversations: Conversation;
  users: User;
  bots: Bot;
};

const getData = async (conversationSlug: string) => {
  const response = await fetch(
    `${ApiEndpoints.Conversation}/slug/${conversationSlug}?includeUser=true&includeBot=true`
  );
  const data = await response.json();
  return data[0] as Data;
};

const Chat = async ({ params }: { params: Promise<{ chat: string }> }) => {
  const [conversationSlug, session] = await Promise.all([
    params.then((p) => p.chat),
    getServerSession(authOptions),
  ]);
  const sessionEmail = session?.user?.email;
  const data = await getData(conversationSlug);

  // console.log("Session email:", sessionEmail);

  if (sessionEmail === undefined) {
    return <RestrictedContent />;
  }

  // console.log(data);

  const userId = data.users.id;
  const userEmail = data.users.email;
  const userName = data.users.name;
  const userImageUrl = data.users.image_url;

  if (sessionEmail !== userEmail) {
    return <p>Forbidden resource</p>;
  }

  const conversationId = data.conversations.id;
  const botName = data.bots.name;
  const botId = data.bots.id;
  const imageUrl = data.bots.image_url;

  return (
    <main className={`h-screen max-w-6xl mx-auto ${beVietNamPro.className}`}>
      {userImageUrl ? (
        <ChatHistoryProvider
          botId={botId}
          userId={userId}
          userName={userName}
          imageUrl={userImageUrl}
        />
      ) : (
        <ChatHistoryProvider
          botId={botId}
          userId={userId}
          userName={userName}
        />
      )}
      <div className="flex flex-col h-full w-auto">
        <ChatHeader
          botName={botName}
          imageUrl={imageUrl}
          conversationSlug={conversationSlug}
        />
        <Suspense fallback={<p>Loading...</p>}>
          <ChatBodyProvider
            conversationId={conversationId}
            chatSlug={conversationSlug}
          />
        </Suspense>
      </div>
    </main>
  );
};

export default Chat;
