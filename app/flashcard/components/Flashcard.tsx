"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

import { BookOpen, Book } from "lucide-react";

import { FC } from "react";

interface FlashcardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  setFlipped: (state: boolean) => void;
}

const Flashcard: FC<FlashcardProps> = ({
  question,
  answer,
  isFlipped,
  setFlipped,
}) => {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="flex flex-col items-center justify-center p-8">
        <CardTitle className="text-black text-3xl">
          {isFlipped ? (
            <div className="flex flex-col items-center">
              <p className="self-start text-xl text-black/50 mr-4">Câu hỏi:</p>
              <span className="text-xl">{question}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="self-start text-xl text-black/50 mr-4">
                Câu trả lời:
              </p>
              <span className="text-xl">{answer}</span>
            </div>
          )}
        </CardTitle>
      </CardContent>
      <CardFooter className="flex justify-center items-center p-4">
        <Button
          className="hover:bg-blue-700"
          onClick={() => setFlipped(!isFlipped)}
        >
          {!isFlipped ? <Book /> : <BookOpen />}
          {!isFlipped ? "Xem câu hỏi" : "Xem câu trả lời"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Flashcard;
