"use client";

import { useState, useEffect } from "react";
import { quizzes, type Quiz } from "@/lib/quizzes";
import { getRandomNumbers } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Lightbulb,
  BookOpenCheck,
  CheckCircle2,
  Undo2,
  Loader2,
  Palette,
  RotateCw,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useModifyPersonalityColor } from "@/lib/api/users/useModifyPersonalityColor";
import { useSession } from "next-auth/react";
import RestrictedContent from "@/components/RestrictedContent";
import { AnimatePresence, motion } from "framer-motion";

type Color = "blue" | "green" | "gold" | "orange";

const colorConfigs = {
  blue: {
    hex: "#3B82F6",
    name: "Xanh Dương",
    attributes: ["Cảm xúc", "Đồng cảm"],
    description: "Điềm tĩnh, đáng tin cậy và trí tuệ.", // Hoặc: "Thanh bình, tin cậy, thông thái."
  },
  green: {
    hex: "#10B981",
    name: "Xanh Lá",
    attributes: ["Phân tích", "Lý trí"],
    description: "Tươi mới, hài hòa và tăng trưởng.", // Hoặc: "Tươi mát, cân bằng, phát triển."
  },
  gold: {
    hex: "#F59E0B",
    name: "Vàng",
    attributes: ["Nguyên tắc", "Tổ chức"],
    description: "Năng lượng, lạc quan và thịnh vượng.", // Hoặc: "Tươi sáng, tích cực, giàu có."
  },
  orange: {
    hex: "#F97316",
    name: "Cam",
    attributes: ["Hành động", "Linh hoạt"],
    description: "Nhiệt huyết, sôi động và sáng tạo.", // Hoặc: "Năng động, hứng khởi, sáng tạo."
  },
};

export const CharacterTest = () => {
  const { data: session, status } = useSession();
  const [selectedQuizzes, setSelectedQuizzes] = useState<Quiz[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: { choiceIndex: number; color: Color };
  }>({});
  const [showResult, setShowResult] = useState(false);
  const [resultColor, setResultColor] = useState<Color>("blue");

  const { modifyColor, isPending } = useModifyPersonalityColor({
    email: session?.user?.email || "",
  });

  useEffect(() => {
    const TOTAL_QUIZZES = quizzes.length;
    if (TOTAL_QUIZZES === 0) return;

    const randomNumbers = getRandomNumbers(0, TOTAL_QUIZZES - 1, 10);
    setSelectedQuizzes(randomNumbers.map((i) => quizzes[i]));
  }, []);

  if (status === "loading") {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <RestrictedContent />;
  }

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

  const handleShowResult = async () => {
    const colorCounts = {
      blue: 0,
      orange: 0,
      gold: 0,
      green: 0,
    };

    Object.values(selectedAnswers).forEach(({ color }) => {
      colorCounts[color]++;
    });

    const mostFrequentColor = Object.entries(colorCounts).reduce(
      (a, b) => (b[1] > a[1] ? b : a),
      ["blue", 0]
    )[0] as Color;

    try {
      await modifyColor(mostFrequentColor);
      setResultColor(mostFrequentColor);
      setShowResult(true);
    } catch (err) {
      console.error("Failed to update personality color:", err);
    }
  };

  const allQuestionsAnswered =
    Object.keys(selectedAnswers).length === selectedQuizzes.length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 md:px-6">
      <AnimatePresence mode="wait">
        {showResult ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-6 md:p-8 border-0 shadow-lg">
              <div className="space-y-8 text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mx-auto w-32 h-32 rounded-full relative"
                  style={{
                    backgroundColor: colorConfigs[resultColor].hex,
                    boxShadow: `0 0 40px ${colorConfigs[resultColor].hex}40`,
                  }}
                >
                  <Palette className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-white/20" />
                </motion.div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-slate-900">
                    Tính cách {colorConfigs[resultColor].name}
                  </h2>
                  <p className="text-slate-600 text-lg">
                    {colorConfigs[resultColor].description}
                  </p>

                  <div className="flex justify-center items-center w-full gap-3">
                    {colorConfigs[resultColor].attributes.map((attr, i) => (
                      <div
                        key={i}
                        className="p-3 bg-slate-100 rounded-lg w-1/2"
                      >
                        <span className="font-medium text-slate-900">
                          {attr}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <Button
                    size="lg"
                    onClick={() => {
                      setShowResult(false);
                      setSelectedAnswers({});
                    }}
                    className="gap-2"
                  >
                    <RotateCw className="h-4 w-4" />
                    Làm lại
                  </Button>
                  <Link href={"/"}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 border-slate-300"
                    >
                      <Undo2 className="h-4 w-4" />
                      Quay lại
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="test"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <Link href={"/"}>
              <Button variant={"ghost"} className="my-4 hover:bg-gray-200">
                <Undo2 />
                Quay lại
              </Button>
            </Link>
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
                disabled={!allQuestionsAnswered || isPending}
                onClick={handleShowResult}
              >
                {allQuestionsAnswered
                  ? isPending
                    ? "Đang cập nhật..."
                    : "Xem kết quả"
                  : "Hãy trả lời tất cả câu hỏi"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
}) => (
  <Button
    variant="outline"
    className={`h-14 text-left justify-start font-normal transition-all
      overflow-hidden text-ellipsis whitespace-normal group
      ${
        isSelected
          ? "bg-blue-50 border-blue-300 shadow-sm hover:bg-blue-50"
          : "text-slate-700 hover:bg-slate-50 hover:shadow-sm border-slate-200"
      }`}
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
