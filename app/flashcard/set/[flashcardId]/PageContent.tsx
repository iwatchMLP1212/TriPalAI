"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Layers,
  Loader2,
  Undo2,
} from "lucide-react";
import { useFetchFlashcardSetById } from "@/lib/api/flashcard-sets/useFetchFlashcardSetsById";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Progress } from "@radix-ui/react-progress";
import Link from "next/link";
import { useSetFlashcardSetIsCompleted } from "@/lib/api/flashcards/useSetFlashcardSetIsCompleted";
import RestrictedContent from "@/components/RestrictedContent";

export default function FlashcardSetPage({
  flashcardId,
}: {
  flashcardId: string;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const userEmail = session?.user?.email ?? "";

  // ✅ always call the hook — control execution with `enabled`
  const {
    data: flashcardSet,
    isLoading,
    isError,
  } = useFetchFlashcardSetById(flashcardId, {
    enabled: !!flashcardId && status === "authenticated",
  });

  // handle loading and auth logic
  if (!flashcardId || status === "loading") {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <RestrictedContent />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
      </div>
    );
  }

  if (flashcardSet?.length === 0) {
    return (
      <p className="text-muted-foreground text-sm text-center mt-10">
        You have no flashcard sets yet.
      </p>
    );
  }

  const isOwner = (flashcardSet?.[0]?.user_email ?? "") === userEmail;

  if (isError || !flashcardSet) {
    return (
      <p className="text-red-500 text-sm text-center mt-10">
        ❌ Failed to load flashcard set.
      </p>
    );
  }

  if (!isOwner) {
    return <RestrictedContent />;
  }

  const totalCards = flashcardSet.length;
  const progress = ((currentCardIndex + 1) / totalCards) * 100;

  const handleNext = () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setShowAnswer(false);
    }
  };

  console.log("Flashcard Set:", flashcardSet);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Link href={"/flashcard"}>
        <Button variant={"ghost"} className="my-4 hover:bg-gray-200">
          <Undo2 />
          Quay lại
        </Button>
      </Link>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Tiến độ: {Math.round(progress)}%
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Thẻ {currentCardIndex + 1}/{totalCards}
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between mb-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentCardIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Trước
        </Button>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentCardIndex === totalCards - 1}
        >
          Sau
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Flashcard Content */}
      <Card className="relative group">
        <CardContent className="p-6 space-y-6">
          {/* Front Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span>Câu hỏi</span>
            </div>
            <p className="text-xl font-medium">
              {flashcardSet[currentCardIndex]?.front}
            </p>
          </div>

          {/* Back Content with Reveal */}
          {showAnswer ? (
            <div className="space-y-4">
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mb-2">
                  <span>Đáp án</span>
                </div>
                <p className="text-muted-foreground text-lg">
                  {flashcardSet[currentCardIndex]?.back}
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => setShowAnswer(false)}
                className="w-full gap-2"
              >
                <EyeOff className="h-4 w-4" />
                Ẩn đáp án
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              onClick={() => setShowAnswer(true)}
              className="w-full gap-2"
            >
              <Eye className="h-4 w-4" />
              Hiện đáp án
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Completion Button */}
      {progress === 100 && <CompleteButton setId={parseInt(flashcardId, 10)} />}
    </div>
  );
}

export function CompleteButton({ setId }: { setId: number }) {
  const router = useRouter();
  const { mutate, isPending } = useSetFlashcardSetIsCompleted();
  console.log("setId:", setId);

  const handleClick = () => {
    mutate(
      { flashcardSetId: setId, isCompleted: true },
      {
        onSuccess: () => {
          router.push("/flashcard");
        },
        onError: (err: any) => {
          console.error("Failed to complete set:", err);
        },
      }
    );
  };

  return (
    <div className="mt-6 text-center">
      <Button
        className="gap-2"
        size="lg"
        onClick={handleClick}
        disabled={isPending}
      >
        <CheckCircle className="h-5 w-5" />
        {isPending ? "Đang lưu..." : "Hoàn thành"}
      </Button>
    </div>
  );
}
