import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteFlashcardSetById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/api/flashcard/sets?id=${id}`);
      return res.data;
    },
    onSuccess: () => {
      // After delete, invalidate flashcard sets list to refetch
      queryClient.invalidateQueries({ queryKey: ["flashcardSets"] });
    },
    onError: (error) => {
      console.error("Delete flashcard set error:", error);
    },
  });
}
