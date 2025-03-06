"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { ApiEndpoints } from "@/lib/utils";

export const page = () => {
  const onButtonClick = async () => {
    const response = await axios.post(ApiEndpoints.AiResponse, {
      message: "Hello, world!",
    });
    console.log(response.data);
    return response.data;
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Button onClick={onButtonClick}>Click me to post</Button>
    </div>
  );
};

export default page;
