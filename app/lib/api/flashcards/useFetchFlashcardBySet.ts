import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ApiEndpoints } from "@/lib/utils";

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  flashcard_set_id: number;
  user_email: string;
  created_at: string;
  updated_at: string;
}

const fetchFlashcardsBySet = async (setId: number): Promise<Flashcard[]> => {
  const res = await axios.get(`${ApiEndpoints.Flashcard}/set/${setId}`);
  return res.data;
};

export const useFetchFlashcardsBySet = (setId: number) => {
  return useQuery<Flashcard[]>({
    queryKey: ["flashcards", setId],
    queryFn: () => fetchFlashcardsBySet(setId),
    enabled: !!setId,
    staleTime: 1000 * 60 * 5,
  });
};
