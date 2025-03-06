"use client";

import { useSession } from "next-auth/react";
import HeaderButton from "@/components/HeaderButton";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>; // Prevents UI flickering while fetching session
  }

  return (
    <header className="text-white text-lg font-semibold pt-6 pl-24">
      <div className="flex gap-2">
        {!session ? (
          <Link href="/signin">
            <HeaderButton>Đăng Nhập</HeaderButton>
          </Link>
        ) : (
          <Link href="/signout">
            <HeaderButton>Đăng xuất</HeaderButton>
          </Link>
        )}
        <HeaderButton>Giới thiệu</HeaderButton>
        <HeaderButton>Cộng đồng</HeaderButton>
      </div>
    </header>
  );
};

export default Header;
