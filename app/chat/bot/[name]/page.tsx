import { primaryFont as beVietNamPro } from "@/lib/utils";
import ChatHeader from "./components/ChatHeader";
import ChatHistoryProvider from "./ChatHistoryProvider";
import { ApiEndpoints } from "@/lib/utils";
import { Bot } from "@/types/drizzle-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

const Chat = async ({ params }: { params: Promise<{ name: string }> }) => {
  const botName = decodeURIComponent((await params).name);
  const response = await fetch(`${ApiEndpoints.Bot}/name/${botName}`);
  const botData = (await response.json())[0] as Bot;
  // console.log(botData);

  const session = await getServerSession(authOptions);
  const sessionUserEmail = session?.user.email;
  // console.log(sessionUserEmail);

  const userIdResponse = await fetch(
    `${ApiEndpoints.User}/email/${sessionUserEmail}?getOnlyId=true`
  );

  const userId = (await userIdResponse.json())[0]["id"];

  // console.log(userId);

  return (
    <main className={`h-screen max-w-6xl mx-auto ${beVietNamPro.className}`}>
      <ChatHistoryProvider userId={userId} botName={botName} />
      <div className="flex flex-col h-full w-auto">
        <ChatHeader botName={botName} imageUrl={botData.image_url} />
        <p>Bấm vào đoạn chat mới để bắt đầu</p>
      </div>
    </main>
  );
};

export default Chat;
