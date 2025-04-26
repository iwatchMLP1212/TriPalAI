"use client";

import { AlertCircle } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Link from "next/link";

const RestrictedContent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md p-8 relative overflow-hidden">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-red-100/80 p-4 rounded-full">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-slate-900">
              Bạn không có quyền truy cập nội dung này
            </h1>
            <h2 className="text-slate-600 font-bold">Lý do</h2>
            <p className="text-slate-600">1. Bạn chưa đăng nhập</p>
            <p className="text-slate-600">2. Bạn không có quyền truy cập</p>
          </div>

          <Button asChild className="w-full gap-2 mt-4">
            <Link href="/">Quay về trang chủ</Link>
          </Button>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full"
          aria-hidden
        />
        <div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full"
          aria-hidden
        />
      </Card>
    </div>
  );
};

export default RestrictedContent;
