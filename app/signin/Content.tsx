"use client";

import LabeledInput from "@/components/LabeledInput";
import { ArrowLeft, Facebook } from "lucide-react";
import Link from "next/link";
import GraphicSection from "./sections/GraphicSection";
import SignInButton from "./components/SignInButton";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Prevents flickering
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column – Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div>
            <Link
              href="/"
              className="flex items-center text-gray-600 w-fit hover:text-blue-500 transition"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span>Trang chủ</span>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Chào mừng trở lại
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Vui lòng đăng nhập để tiếp tục
            </p>
          </div>

          {/* Form Card */}
          <form className="mt-8 space-y-6 bg-white p-6 rounded-xl shadow-md">
            <LabeledInput
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="name@example.com"
            />
            <LabeledInput
              label="Mật khẩu"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline text-sm"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <div>
              <SignInButton />
            </div>

            {/* Social Login */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc tiếp tục với
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition"
              >
                <Facebook size={20} className="text-blue-600" />
              </button>
              <GoogleSignInButton />
            </div>

            {/* Registration Prompt */}
            <p className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Đăng ký ngay
              </Link>
            </p>
          </form>
        </div>
      </div>

      <GraphicSection />
    </main>
  );
};

export default SignIn;
