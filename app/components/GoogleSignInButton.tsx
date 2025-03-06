"use client";

import { signIn } from "next-auth/react";

const GoogleSignInButton = () => {
  return (
    <button
      onClick={() => signIn("google")}
      type="button"
      className="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition"
    >
      Google
    </button>
  );
};

export default GoogleSignInButton;
