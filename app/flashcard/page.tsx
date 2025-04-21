"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import Flashcard from "./components/Flashcard";

import { useState } from "react";

import { ChevronLeft, ChevronRight, CornerUpLeft } from "lucide-react";

const Page = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);

  const cards = [
    {
      question: "Typescript là gì?",
      answer:
        "Typescript là một ngôn ngữ lập trình được phát triển bởi Microsoft, mở rộng JavaScript bằng cách thêm kiểu tĩnh.",
    },
    {
      question: "React là gì?",
      answer:
        "React là một thư viện JavaScript để xây dựng giao diện người dùng, được phát triển bởi Facebook.",
    },
    {
      question: "Node.js là gì?",
      answer:
        "Node.js là một môi trường chạy JavaScript bên ngoài trình duyệt, cho phép phát triển ứng dụng máy chủ.",
    },
    {
      question: "Redux là gì?",
      answer:
        "Redux là một thư viện quản lý trạng thái cho ứng dụng JavaScript, thường được sử dụng với React.",
    },
  ];

  const TOTAL_CARDS = cards.length - 1;

  const handleNextCard = () => {
    if (currentCardIndex < TOTAL_CARDS) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsFlipped(true);
    }
  };
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setIsFlipped(true);
    }
  };

  return (
    <div className="max-w-xl min-h-screen mx-auto flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-2">
        Các câu hỏi về lập trình website
      </h1>
      <Progress
        value={currentCardIndex * (100 / TOTAL_CARDS)}
        className="max-w-md my-4"
      />
      <Flashcard
        question={cards[currentCardIndex].question}
        answer={cards[currentCardIndex].answer}
        isFlipped={isFlipped}
        setFlipped={() => setIsFlipped((prev) => !prev)}
      />
      <div className="flex items-center justify-between gap-4 w-full max-w-lg mt-4">
        <Button
          variant={"ghost"}
          className="hover:bg-gray-200 rounded-full"
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
        >
          <ChevronLeft />
        </Button>
        <p>
          {currentCardIndex}/{TOTAL_CARDS}
        </p>
        <Button
          variant={"ghost"}
          className="hover:bg-gray-200 rounded-full"
          onClick={handleNextCard}
          disabled={currentCardIndex === TOTAL_CARDS}
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-4 w-full max-w-lg mt-4">
        <Button className="mt-4 hover:bg-blue-700">
          <CornerUpLeft />
          Quay lại
        </Button>
        <Button
          className="mt-4 hover:bg-blue-700"
          disabled={currentCardIndex !== TOTAL_CARDS}
        >
          Hoàn thành
        </Button>
      </div>
    </div>
  );
};

export default Page;
