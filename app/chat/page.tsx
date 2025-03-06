import { primaryFont as beVietNamPro } from "@/lib/utils";
import ChatHeader from "./bot/[name]/components/ChatHeader";
import ChatHistoryProvider from "./bot/[name]/ChatHistoryProvider";
import ChatBodyProvider from "./bot/[name]/ChatBodyProvider";
import { ApiEndpoints } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

const Chat = async ({ params }: { params: Promise<{ name: string }> }) => {
  const botName = "BOT_TEST";

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
        <ChatHeader botName={botName} imageUrl={"https://i.pravatar.cc/300"} />
        <ChatBodyProvider />
      </div>
    </main>
  );
};

export default Chat;
