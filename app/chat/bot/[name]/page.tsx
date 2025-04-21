import { User } from "@/types/drizzle-table";

import { primaryFont as beVietNamPro } from "@/lib/utils";
import { ApiEndpoints } from "@/lib/utils";

import { Bot } from "@/types/drizzle-table";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

import ChatHeader from "./components/ChatHeader";
import ChatHistoryProvider from "./ChatHistoryProvider";
import { Card } from "@/components/ui/card";

const Chat = async ({ params }: { params: Promise<{ name: string }> }) => {
  const botName = decodeURIComponent((await params).name);
  const response = await fetch(`${ApiEndpoints.Bot}/name/${botName}`);
  const botData = (await response.json())[0] as Bot;
  // console.log(botData);

  const session = await getServerSession(authOptions);
  const sessionUserEmail = session?.user.email;
  // console.log(sessionUserEmail);

  const userResponse = await fetch(
    `${ApiEndpoints.User}/email/${sessionUserEmail}`
  );

  const userData = (await userResponse.json())[0] as User;
  const userId = userData.id;
  const userName = userData.name;
  const userImageUrl = userData.image_url;

  const botId = botData.id;

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
          imageUrl={botData.image_url}
          hasSettingButton={false}
        />
        <div className="flex justify-center h-full mb-28">
          <Card className="self-end p-4 shadow-md hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center justify-center h-full w-full">
              <h1 className="text-2xl font-bold text-center mb-4">
                Chào mừng bạn đến với {botName}
              </h1>
              <p className="text-lg text-muted-foreground text-center mb-4">
                Bấm vào đoạn chat mới để trò chuyện với {botName} ngay bây giờ!
              </p>
              <img
                src={botData.image_url}
                alt={botName}
                className="w-32 h-32 rounded-full mb-4"
              />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Chat;
