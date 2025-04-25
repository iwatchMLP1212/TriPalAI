import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiEndpoints } from "@/lib/utils";

interface SetFlashcardSetCompletedArgs {
  flashcardSetId: number;
  isCompleted: boolean;
}

export function useSetFlashcardSetIsCompleted() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      flashcardSetId,
      isCompleted,
    }: SetFlashcardSetCompletedArgs) => {
      const response = await axios.patch(
        `${ApiEndpoints.Flashcard}/complete/${flashcardSetId}`,
        {
          is_completed: isCompleted,
        }
      );
      return response.data;
    },
    onSuccess: (_, { flashcardSetId, isCompleted }) => {
      queryClient.setQueryData(
        ["flashcardSet", flashcardSetId],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            is_completed: isCompleted,
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ["flashcardSets"] });
    },
    onError: (error) => {
      console.error("❌ Failed to update flashcard set completion:", error);
    },
  });
}
