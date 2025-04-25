import PageContent from "./PageContent";
import Providers from "../../components/Providers"; // new wrapper

export default function Page({ params }: { params: { flashcardId: string } }) {
  return (
    <Providers>
      <PageContent flashcardId={params.flashcardId} />
    </Providers>
  );
}
