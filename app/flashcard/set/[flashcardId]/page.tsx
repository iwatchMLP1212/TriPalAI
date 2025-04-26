import PageContent from "./PageContent";
import Providers from "../../components/Providers"; // new wrapper

export default async function Page({
  params,
}: {
  params: Promise<{ flashcardId: string }>;
}) {
  return (
    <Providers>
      <PageContent flashcardId={(await params).flashcardId} />
    </Providers>
  );
}
