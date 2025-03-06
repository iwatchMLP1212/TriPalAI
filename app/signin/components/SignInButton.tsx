"use client";

import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <button
      onClick={() => signIn("google")}
      type="submit"
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Đăng nhập
    </button>
  );
};

export default SignInButton;
