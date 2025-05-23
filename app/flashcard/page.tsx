"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

import { SessionProvider } from "next-auth/react";

import PageContent from "./PageContent";

const page = () => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <PageContent />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default page;
