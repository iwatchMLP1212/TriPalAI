"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Caught in error.tsx:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-y-4 justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl mb-8">
        Rất tiếc trang này không tồn tại.{" "}
        <span className="text-black/50 text-xl">404</span>
      </h1>
      <Link href={"/"} className="underline text-blue-500 text-xl">
        Quay lại
      </Link>
    </div>
  );
}
