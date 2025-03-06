import { primaryFont as beVietNamPro } from "@/lib/utils";
import AboutText from "../components/AboutText";
import Card from "../components/Card";

const IntroductionSection = async () => {
  const aboutTexts = [
    {
      title: "Hỗ trợ học tập",
      detail:
        "Cung cấp tài liệu, hướng dẫn và trợ giúp để nâng cao hiệu quả học tập.",
    },
    {
      title: "Phát triển kỹ năng",
      detail:
        "Giúp rèn luyện và cải thiện các kỹ năng mềm, tư duy logic và khả năng giải quyết vấn đề.",
    },
    {
      title: "Cộng đồng học tập",
      detail:
        "Kết nối với những người có cùng đam mê, chia sẻ kiến thức và cùng nhau tiến bộ.",
    },
  ];

  const Subjects = [
    {
      title: "Toán học - Math",
      detail:
        "Toán học chủ yếu tập trung vào các khái niệm cơ bản như số học, đại số, hình học, lượng giác, và giải tích.",
      className: "bg-blue-100",
      href: "/math",
    },
    {
      title: "Văn Học - Literature",
      detail:
        "Văn học tập trung vào việc đọc, hiểu và phân tích. Khuyến khích tư duy sáng tạo và quan điểm cá nhân.",
      className: "bg-orange-100",
      href: "/literature",
    },
    {
      title: "Anh Ngữ - English",
      detail:
        "Tiếng Anh tập trung vào ngữ pháp, từ vựng, dịch thuật và kỹ năng giao tiếp thực tế",
      className: "bg-emerald-100",
      href: "/english",
    },
  ];

  return (
    <section className={`max-w-7xl m-auto mt-16 ${beVietNamPro.className}`}>
      <h2
        className={`bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent leading-loose text-4xl text-center font-bold`}
      >
        Dự án học tập bằng AI
      </h2>
      <div className="flex justify-between items-center gap-4 mt-14">
        {aboutTexts.map((text, idx) => (
          <AboutText detail={text.detail} key={idx}>
            {text.title}
          </AboutText>
        ))}
      </div>
      <h2
        className={`mt-12 bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent leading-loose text-4xl text-center font-bold`}
      >
        Hệ thống AI hỗ trợ học tập cho từng môn học
      </h2>
      <div className="flex-wrap flex justify-between items-center gap-4 mt-14">
        {Subjects.map((text, idx) => (
          <Card
            title={text.title}
            detail={text.detail}
            key={idx}
            className={text.className}
            href={text.href}
          />
        ))}
      </div>
    </section>
  );
};

export default IntroductionSection;
