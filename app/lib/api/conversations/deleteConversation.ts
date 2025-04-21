import axios from "axios";
import { ApiEndpoints } from "@/lib/utils";

export const deleteConversation = async (slug: string) => {
  const response = await axios.delete(
    `${ApiEndpoints.Conversation}/slug/${slug}`
  );
  return response.data;
};
