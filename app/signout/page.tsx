"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignOutPage() {
  useEffect(() => {
    // This will clear your app's session and then redirect to "/"
    signOut({ callbackUrl: "/" });
  }, []);

  return <div>Signing out...</div>;
}
