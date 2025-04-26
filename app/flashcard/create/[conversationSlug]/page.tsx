"use client";

import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import PageContent from "@/flashcard/create/[conversationSlug]/PageContent";
import { use } from "react";

const page = ({
  params,
}: {
  params: Promise<{ conversationSlug: string }>;
}) => {
  const { conversationSlug } = use(params);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <PageContent conversationSlug={conversationSlug} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default page;
