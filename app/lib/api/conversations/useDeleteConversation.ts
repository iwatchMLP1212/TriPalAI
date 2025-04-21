"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteConversation } from "./deleteConversation";
import { queryClient } from "@/lib/queryClient";
import { useRouter } from "next/navigation";

export const useDeleteConversation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      router.push("/");
    },
    onError: (error) => {
      console.error("Error deleting chat:", error);
    },
  });
};
