// hooks/useFetchMessagesByConversationSlug.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ApiEndpoints } from "@/lib/utils";

export function useFetchMessagesByConversationSlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["messages", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");
      const res = await axios.get(`${ApiEndpoints.Message}/conv-slug/${slug}`, {
        params: {
          returnOnlyContent: true,
        },
      });
      return res.data;
    },
    enabled: !!slug,
  });
}
