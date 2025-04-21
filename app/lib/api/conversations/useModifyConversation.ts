import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ApiEndpoints } from "@/lib/utils"; // Your API endpoints
import { queryClient } from "@/lib/queryClient";
import { Conversation } from "@/types/drizzle-table";

// Define the expected return type of the modifyConversation function
interface ModifyConversationResponse {
  id: number;
  name: string;
  slug: string;
  user_id: number;
  bot_id: number;
  last_open: string;
}

// Define the input structure for the modifyConversation function
interface ModifyConversationInput {
  name: string;
  user_id?: number;
  bot_id?: number;
}

// Mutation function to modify a conversation
const modifyConversation = async ({
  slug,
  updatedData,
}: {
  slug: string;
  updatedData: ModifyConversationInput;
}): Promise<ModifyConversationResponse> => {
  const response = await axios.put(
    `${ApiEndpoints.Conversation}/slug/${slug}`,
    updatedData
  );
  return response.data; // The response data is expected to match ModifyConversationResponse
};

// Using `ModifyConversationResponse` as the type of the mutation result
export const useModifyConversation = () => {
  return useMutation<
    ModifyConversationResponse, // TData
    Error, // TError
    { slug: string; updatedData: ModifyConversationInput } // TVariables
  >({
    mutationFn: modifyConversation,
    onSuccess: (data: ModifyConversationResponse) => {
      queryClient.invalidateQueries({ queryKey: ["conversations", "chats"] });
      console.log("Conversation modified successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Error modifying conversation:", error);
    },
  });
};
