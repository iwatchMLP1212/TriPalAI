import { Button } from "@/components/ui/button";

import { Sparkles, BookOpen, UserCog, Star } from "lucide-react";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOption";

import { redirect } from "next/navigation";
import GoogleSignInButton from "./components/GoogleSignInButton";

const LandingPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/chat/bot/Math");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#3A86FF]/5 to-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2720%27 height=%2720%27 viewBox=%270 0 20 20%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27%233A86FF%27 fill-opacity=%270.05%27 fill-rule=%27evenodd%27%3E%3Ccircle cx=%273%27 cy=%273%27 r=%273%27/%3E%3Ccircle cx=%2713%27 cy=%2713%27 r=%273%27/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-[#50C878]/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#3A86FF]/10 via-transparent to-transparent"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float animation-delay-2000">
          <BookOpen className="w-8 h-8 text-[#3A86FF]/30" />
        </div>
        <div className="absolute top-40 right-20 animate-float">
          <UserCog className="w-10 h-10 text-[#50C878]/30" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float animation-delay-4000">
          <Star className="w-6 h-6 text-[#3A86FF]/30" />
        </div>
      </div>

      <div className="max-w-4xl w-full text-center space-y-8 z-10 px-4">
        <h1 className="animate-[fadeIn_0.8s_ease-out] text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#573aff] via-[#4f8cd1] to-[#653aff]">
          TriPalAI
        </h1>

        <p className="animate-[fadeIn_0.8s_ease-out] delay-300 text-xl md:text-2xl text-[#B0B3B8] max-w-2xl mx-auto">
          Người bạn đồng hành trong hành trình học tập của bạn
        </p>

        <div className="animate-[fadeIn_1.8s_ease-out] delay-300 space-y-6">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            TriPalAI giúp bạn giải quyết mọi khó khăn trong học tập, từ việc
            giải bài tập đến lên kế hoạch học tập cá nhân hoá. Với TriPalAI, bạn
            sẽ không còn đơn độc trong hành trình học tập của mình.
          </p>

          <GoogleSignInButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-[fadeIn_0.8s_ease-out] delay-[900ms]">
          {[
            {
              icon: BookOpen,
              title: "Học tập thông minh hơn",
              desc: "AI giải đáp mọi khó khăn trong học tập",
            },
            {
              icon: UserCog,
              title: "Cá nhân hoá",
              desc: "Lên kế hoạch học tập theo cách của bạn",
            },
            {
              icon: Star,
              title: "Tính tương tác",
              desc: "Tạo flashcard và bài kiểm tra thú vị",
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-[#3A86FF]/10 hover:border-[#50C878]/20 transition-all duration-300 hover:shadow-lg"
            >
              <feature.icon className="w-8 h-8 text-[#3A86FF] mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-[#B0B3B8]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#3A86FF]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-32 right-0 w-96 h-96 bg-[#50C878]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#B0B3B8]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default LandingPage;
