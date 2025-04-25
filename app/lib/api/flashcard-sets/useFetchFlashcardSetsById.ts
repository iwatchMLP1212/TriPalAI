"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ApiEndpoints } from "@/lib/utils";

import { Flashcard } from "@/types/drizzle-table";

const fetchFlashcardSetById = async (
  flashcardId: string
): Promise<Flashcard[]> => {
  const res = await axios.get(`${ApiEndpoints.Flashcard}/sets/${flashcardId}`);
  return res.data;
};

export const useFetchFlashcardSetById = (flashcardId: string, options = {}) => {
  return useQuery<Flashcard[]>({
    queryKey: ["flashcardSet", flashcardId],
    queryFn: async () => await fetchFlashcardSetById(flashcardId),
    enabled: !!flashcardId,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
