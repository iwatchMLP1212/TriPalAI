"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import HeaderButton from "@/components/HeaderButton";

const SignInButton = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return <HeaderButton>Đăng nhập</HeaderButton>;
  }
  return <HeaderButton>Đăng xuất</HeaderButton>;
};

export default SignInButton;
