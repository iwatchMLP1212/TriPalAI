"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { CharacterTest } from "./PageContent";

const page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <CharacterTest />
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default page;
