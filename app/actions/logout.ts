import { cookies } from "next/headers";

export const logout = async () => {
  (await cookies()).delete("next-auth.session-token");
};
