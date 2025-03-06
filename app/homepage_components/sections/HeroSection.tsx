"use client";

import { SessionProvider } from "next-auth/react";
import { primaryFont as beVietNamPro } from "@/lib/utils";
import Header from "../components/Header";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[48rem] bg-gradient-to-br from-[#3A86FF] via-[#5A9FFF] to-primary/25 overflow-hidden">
      {/* Content container */}
      <SessionProvider>
        <Header />
      </SessionProvider>
      <div className="relative container mx-auto px-4 h-3/4 flex items-center">
        <div className="max-w-2xl text-center md:text-left">
          <h1
            className={`text-white text-5xl md:text-7xl font-bold mb-6 leading-tight ${beVietNamPro.className}`}
          >
            Ứng dụng học tập
            <span className="block text-3xl md:text-4xl font-normal mt-4">
              Học mọi lúc, mọi nơi
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-100 mb-8">
            Ứng dụng học tập tích hợp AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-white text-[#3A86FF] px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all hover:scale-105 shadow-lg">
              Bắt đầu học ngay
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#3A86FF] transition-all hover:scale-105">
              Xem khoá học
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
