"use client";

import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { useFetchMessagesByConversationSlug } from "@/lib/api/messages/useFetchMessagesByConversationSlug";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PageContent({
  conversationSlug,
}: {
  conversationSlug: string;
}) {
  const { data: messages, isLoading } =
    useFetchMessagesByConversationSlug(conversationSlug);
  const { data: session, status } = useSession();

  const router = useRouter();

  const mergeMessagesIntoParagraph = (
    messages: { content: string }[]
  ): string => {
    if (!Array.isArray(messages) || messages.length === 0) return "";
    return messages
      .map((msg) => msg.content.trim())
      .filter((content) => content.length > 0)
      .join(" ");
  };

  useEffect(() => {
    if (!isLoading && status === "authenticated" && messages?.length) {
      const mergedMessages = mergeMessagesIntoParagraph(messages);

      const sendMergedMessages = async () => {
        try {
          const user_email = session.user.email;
          const res = await axios.post("http://127.0.0.1:8000/flashcard/", {
            message: mergedMessages,
            user_email: user_email,
          });
          console.log("Flashcard API response:", res.data);
          router.push("/flashcard");
        } catch (error: any) {
          console.error(
            "Failed to send flashcard data:",
            error.response?.data || error.message
          );
        }
      };

      sendMergedMessages();
    }
  }, [isLoading, status, messages, session]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100/80 to-purple-100/80 backdrop-blur-lg"
    >
      <div className="absolute inset-0 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-200/30 via-purple-200/30 to-primary-200/30 animate-gradient-rotate" />

      <div className="relative flex flex-col items-center gap-8 max-w-md w-full px-4">
        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-20 w-20 text-primary" strokeWidth={1.2} />
        </motion.div>
        <div className="w-full max-w-xs space-y-4">
          <motion.div
            className="flex items-center justify-center gap-3"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <div className="flex gap-1 text-sm text-primary">
              <span>Đang xử lý</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ...
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            className="relative h-3 rounded-full bg-purple-100 overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-sky-400 w-full" />
            <motion.div
              className="absolute right-0 w-4 h-4 bg-white rounded-full -translate-y-1/2 top-1/2 shadow-sm"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* Gợi ý nhẹ nhàng */}
        <motion.p
          className="text-sm text-muted-foreground text-center mt-4"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Trí tuệ nhân tạo đang phân tích các khái niệm và mối quan hệ then chốt
        </motion.p>
      </div>
    </motion.div>
  );
}
