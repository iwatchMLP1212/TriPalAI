import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ApiEndpoints } from "@/lib/utils";

import { Flashcard } from "../../../types/drizzle-table";

const fetchFlashcardsByUserId = async (
  userEmail: string
): Promise<Flashcard[]> => {
  const res = await axios.get(
    `${ApiEndpoints.Flashcard}/userEmail/${userEmail}`
  );
  return res.data;
};

export const useFetchFlashcardsByUserEmail = (userEmail: string) => {
  return useQuery<Flashcard[]>({
    queryKey: ["flashcards", userEmail],
    queryFn: () => fetchFlashcardsByUserId(userEmail),
    enabled: !!userEmail, // only run if userId is truthy
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
