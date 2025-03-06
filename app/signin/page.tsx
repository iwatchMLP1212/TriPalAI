"use client";

import SignIn from "./Content";
import { SessionProvider } from "next-auth/react";

const page = () => {
  return (
    <SessionProvider>
      <SignIn />
    </SessionProvider>
  );
};

export default page;
