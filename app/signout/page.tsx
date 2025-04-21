"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { Routes } from "@/lib/utils";

export default function SignOutPage() {
  useEffect(() => {
    signOut({ callbackUrl: Routes.networkHost });
  }, []);

  return <div className="font-bold text-lg">Đang đang xuất...</div>;
}
