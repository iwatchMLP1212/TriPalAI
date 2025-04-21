"use client";

import { useState, useEffect } from "react";

import { quizzes, type Quiz, calculatePercentage } from "@/lib/quizzes";
import { getRandomNumbers } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Lightbulb, BookOpenCheck, CheckCircle2 } from "lucide-react";

type Color = "blue" | "green" | "gold" | "orange";

const page = () => {
  const [selectedQuizzes, setSelectedQuizzes] = useState<Quiz[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: { choiceIndex: number; color: Color };
  }>({});
  const [percentages, setPercentages] = useState<{
    blue: number;
    green: number;
    gold: number;
    orange: number;
  } | null>(null);

  useEffect(() => {
    const TOTAL_QUIZZES = quizzes.length;
    if (TOTAL_QUIZZES === 0) return;

    const randomNumbers = getRandomNumbers(0, TOTAL_QUIZZES - 1, 10);
    const selected = randomNumbers.map((i) => quizzes[i]);
    setSelectedQuizzes(selected);
  }, []);

  const handleAnswerSelect = (
    questionIndex: number,
    choiceIndex: number,
    color: Color
  ) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: { choiceIndex, color },
    }));
  };

  const handleShowResult = () => {
    console.log(selectedAnswers);

    const colorCounts = {
      blue: 0,
      orange: 0,
      gold: 0,
      green: 0,
    };

    Object.values(selectedAnswers).forEach(({ color }) => {
      if (colorCounts.hasOwnProperty(color)) {
        colorCounts[color as keyof typeof colorCounts]++;
      }
    });

    setPercentages(calculatePercentage(colorCounts));
    console.log("Color percentages:", percentages);
  };

  const allQuestionsAnswered =
    Object.keys(selectedAnswers).length === selectedQuizzes.length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <BookOpenCheck className="h-8 w-8" /> Kiểm tra tính cách
          </h1>
          <p className="text-black/75 font-bold text-lg">
            Giúp A.I hiểu bạn hơn qua bài kiểm tra tính cách
          </p>
        </div>

        <div className="space-y-6">
          {selectedQuizzes.map((quiz: Quiz, questionIndex: number) => (
            <Card
              key={questionIndex}
              className="group transition-all border-2 border-slate-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-slate-600">
                  <Lightbulb className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold text-sm">
                    Câu hỏi {questionIndex + 1}
                  </span>
                  {selectedAnswers[questionIndex] !== undefined && (
                    <CheckCircle2 className="h-4 w-4 ml-2 text-primary" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <h2 className="text-xl font-medium text-slate-900">
                  {quiz.question}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quiz.choices.map((choice, choiceIndex) => (
                    <ChoiceButton
                      key={choiceIndex}
                      isSelected={
                        selectedAnswers[questionIndex]?.choiceIndex ===
                        choiceIndex
                      }
                      onSelect={() =>
                        handleAnswerSelect(
                          questionIndex,
                          choiceIndex,
                          quiz.choices[choiceIndex].color
                        )
                      }
                      letter={String.fromCharCode(65 + choiceIndex)}
                    >
                      {choice.text}
                    </ChoiceButton>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4 pb-8">
          <Button
            size="lg"
            className="px-8 shadow-md transition-all"
            disabled={!allQuestionsAnswered}
            onClick={handleShowResult}
          >
            {allQuestionsAnswered
              ? "Xem kết quả"
              : "Hãy trả lời tất cả câu hỏi"}
          </Button>
        </div>
      </div>
      {selectedAnswers[0] !== undefined && (
        <div className="max-w-3xl mx-auto w-full mt-8 p-4 bg-white rounded-lg shadow-md border">
          <p>Blue: {percentages?.blue}%</p>
          <p>Green: {percentages?.green}%</p>
          <p>Gold: {percentages?.gold}%</p>
          <p>Orange: {percentages?.orange}%</p>
          <progress
            value={percentages?.blue}
            max={100}
            className="text-blue-200"
          />
        </div>
      )}
    </div>
  );
};

const ChoiceButton = ({
  children,
  isSelected,
  onSelect,
  letter,
}: {
  children: string;
  isSelected: boolean;
  onSelect: () => void;
  letter: string;
}) => {
  return (
    <Button
      variant="outline"
      className={`h-14 text-left justify-start font-normal transition-all
        overflow-hidden text-ellipsis whitespace-normal group
        ${
          isSelected
            ? "bg-blue-50 border-blue-300 shadow-sm hover:bg-blue-50"
            : "text-slate-700 hover:bg-slate-50 hover:shadow-sm border-slate-200"
        }
      `}
      title={children}
      onClick={onSelect}
    >
      <span
        className={`mr-3 font-medium ${
          isSelected ? "text-primary" : "text-slate-500"
        }`}
      >
        {letter}.
      </span>
      {children}
    </Button>
  );
};

export default page;
