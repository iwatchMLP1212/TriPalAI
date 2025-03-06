import LabeledInput from "@/components/LabeledInput";
import { ArrowLeft, Facebook, Github } from "lucide-react";
import Link from "next/link";

const SignUp = () => {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-500 transition flex items-center w-fit"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span>Trang chủ</span>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Tạo tài khoản mới
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Đăng ký để trải nghiệm dịch vụ của chúng tôi
            </p>
          </div>

          <form className="mt-8 space-y-6 bg-white p-6 rounded-xl shadow-md">
            <div className="grid grid-cols-2 gap-4">
              <LabeledInput
                label="Họ"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Nhập họ của bạn..."
              />
              <LabeledInput
                label="Tên"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Nhập tên của bạn..."
              />
            </div>

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
            <LabeledInput
              label="Xác nhận mật khẩu"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
            />

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                Tôi đồng ý với{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Điều khoản dịch vụ
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Đăng ký
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc đăng ký với
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
              <button
                type="button"
                className="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition"
              >
                <Github size={20} className="text-gray-800" />
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                href="/signin"
                className="text-blue-600 hover:underline font-medium"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Column - Graphic */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600"></div>
        <div className="relative max-w-xl text-center px-6">
          <h3 className="text-white text-5xl font-bold drop-shadow-lg">
            Bắt đầu hành trình mới <span className="inline-block ml-2">🚀</span>
          </h3>
          <p className="mt-4 text-white text-lg opacity-90">
            Tham gia cộng đồng của chúng tôi và khám phá những tiện ích tuyệt
            vời.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              "✅ Truy cập không giới hạn",
              "🔐 Bảo mật an toàn",
              "💡 Hỗ trợ 24/7",
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 bg-white/10 rounded-lg backdrop-blur-md"
              >
                <p className="text-sm text-white">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
