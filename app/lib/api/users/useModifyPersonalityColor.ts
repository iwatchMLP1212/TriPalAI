import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { ApiEndpoints } from "@/lib/utils";

const ALLOWED_COLORS = ["blue", "green", "yellow", "orange"] as const;
type PersonalityColor = (typeof ALLOWED_COLORS)[number];

export const useModifyPersonalityColor = ({
  email,
}: {
  email?: string | null;
}) => {
  const mutation = useMutation({
    mutationFn: async (color: string) => {
      if (!email) throw new Error("Email is required");
      if (!ALLOWED_COLORS.includes(color as PersonalityColor)) {
        throw new Error(
          "Invalid color. Must be blue, green, yellow, or orange."
        );
      }

      const { data } = await axios.patch(
        `${ApiEndpoints.User}/email/${email}`,
        {
          personality_color: color,
        }
      );

      return data;
    },
    onError: (error: any) => {
      console.error(
        "Failed to modify personality color:",
        error?.message || error
      );
    },
    retry: 1, // Optional: retry once if it fails (but not infinite retries like an idiot)
  });

  return {
    modifyColor: mutation.mutateAsync,
    ...mutation,
  };
};
