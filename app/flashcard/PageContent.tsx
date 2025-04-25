"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Layers,
  Loader2,
  Plus,
  FileText,
  AlertCircle,
  Undo2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFetchFlashcardSetsByEmail } from "@/lib/api/flashcard-sets/useFetchFlashcardSetsByEmail";
import Link from "next/link";

export default function PageContent() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email ?? "";

  const {
    data: sets,
    isLoading,
    isError,
  } = useFetchFlashcardSetsByEmail(userEmail, {
    enabled: !!userEmail,
  });

  if (status === "loading" || !userEmail) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  console.log("Bộ flashcard:", sets);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Link href={"/"}>
        <Button variant={"ghost"} className="my-4 hover:bg-gray-200">
          <Undo2 />
          Quay lại
        </Button>
      </Link>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Bộ Flashcard Của Bạn
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {sets?.length
                ? `${sets.length} bộ có sẵn`
                : "Bắt đầu tạo bộ flashcard đầu tiên của bạn"}
            </p>
          </div>
        </div>
        <Button onClick={() => router.push("/flashcard/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Tạo Bộ Flashcard Mới
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <div>
            <h3 className="text-lg font-medium mb-2">Tải bộ thất bại</h3>
            <p className="text-muted-foreground text-sm">
              Vui lòng thử làm mới trang hoặc kiểm tra kết nối của bạn
            </p>
          </div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Thử lại
          </Button>
        </div>
      ) : sets?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground" />
          <div>
            <h3 className="text-lg font-medium mb-2">
              Không tìm thấy bộ flashcard
            </h3>
            <p className="text-muted-foreground text-sm">
              Bắt đầu bằng cách tạo bộ flashcard mới
            </p>
          </div>
          <Button onClick={() => router.push("/flashcard/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Tạo Bộ Mới
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {sets!.map((set) => (
            <motion.div
              key={set.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className="h-full transition-shadow hover:shadow-md cursor-pointer group"
                onClick={() => router.push(`/flashcard/set/${set.id}`)}
              >
                <CardContent className="h-36 p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-[calc(100%-40px)]">
                        <div className="flex items-center gap-4">
                          <h3
                            className="font-semibold truncate max-w-32"
                            title={set.title}
                          >
                            {set.title}
                          </h3>
                          <span
                            className={`text-xs ${
                              set.is_completed
                                ? "bg-primary text-white"
                                : "bg-muted"
                            } px-2 py-1 rounded-full`}
                          >
                            {set.is_completed
                              ? "Đã hoàn thành"
                              : "Chưa hoàn thành"}
                          </span>
                        </div>
                        <p
                          className="text-sm text-muted-foreground mt-1 truncate"
                          title={set.description}
                        >
                          {set.description || "Không có mô tả"}
                        </p>
                      </div>
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Layers className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{set.flashcards_count || 0} thẻ</span>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {new Date(
                          String(set.last_studied)
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
