import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ApiEndpoints } from "@/lib/utils";

import { FlashcardSet } from "@/types/drizzle-table";

const fetchFlashcardSets = async (email: string): Promise<FlashcardSet[]> => {
  const res = await axios.get(`${ApiEndpoints.Flashcard}/sets`, {
    params: { email },
  });
  return res.data;
};

export const useFetchFlashcardSetsByEmail = (email: string, options = {}) => {
  return useQuery({
    queryKey: ["flashcardSets", email],
    queryFn: async () => await fetchFlashcardSets(email),
    enabled: !!email,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
