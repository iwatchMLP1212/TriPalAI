import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Flashcard } from "@/types/drizzle-table";

import { ApiEndpoints } from "@/lib/utils";

interface NewFlashcard {
  front: string;
  back: string;
  user_id: number;
}

const createFlashcard = async (flashcard: NewFlashcard): Promise<Flashcard> => {
  const res = await axios.post(ApiEndpoints.Flashcard, flashcard);
  return res.data;
};

export const useCreateFlashcard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFlashcard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
    },
    onError: (err) => {
      console.error("Failed to create flashcard:", err);
    },
  });
};
