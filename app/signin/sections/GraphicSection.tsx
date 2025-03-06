import Link from "next/link";

const GraphicSection = () => {
  return (
    <div className="hidden lg:flex flex-col flex-1 items-center justify-center relative bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative max-w-xl text-center px-6 space-y-6">
        <h2 className="text-5xl font-bold drop-shadow-lg">
          Khám phá thế giới mới <span className="inline-block ml-2">🌍</span>
        </h2>
        <p className="text-xl opacity-90">
          Kết nối với cộng đồng hơn 1 triệu thành viên và khám phá những điều
          tuyệt vời.
        </p>
      </div>
      <div className="mt-8 group relative">
        <div className="absolute -inset-2 bg-white/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
        <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/20 hover:border-white/30 transition-all">
          {/*  */}
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <div className="text-left bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"></div>
      </div>

      <div className="mt-8 animate-float">
        <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors cursor-pointer border border-white/30">
          <span className="mr-2">🎉</span>
          <Link href={"/signup"} className="font-medium">
            Bắt đầu hành trình ngay!
          </Link>
        </div>
      </div>
      <div />
    </div>
  );
};

export default GraphicSection;
