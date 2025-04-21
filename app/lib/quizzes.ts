export interface Quiz {
  question: string;
  choices: Array<{
    text: string;
    color: "blue" | "green" | "gold" | "orange";
  }>;
}

export const calculatePercentage = ({
  blue,
  orange,
  gold,
  green,
}: {
  blue: number;
  orange: number;
  gold: number;
  green: number;
}) => {
  const total = blue + orange + gold + green;
  return {
    blue: Math.round((blue / total) * 100),
    orange: Math.round((orange / total) * 100),
    gold: Math.round((gold / total) * 100),
    green: Math.round((green / total) * 100),
  };
};

export const personalityDescriptions = {
  Blue: {
    title: "Sống tình cảm, lắng nghe con tim",
    content: `
            Bạn là người sống tình cảm, quan tâm đến cảm xúc của người khác và luôn tìm kiếm sự hài hòa trong cuộc sống.
            Bạn dễ đồng cảm, luôn sẵn sàng giúp đỡ người khác và rất nhạy bén với cảm xúc của mọi người xung quanh.
            Bạn coi trọng mối quan hệ, yêu thích sự gắn kết và luôn muốn làm cho thế giới trở nên tốt đẹp hơn.
        `,
    strengths: ["Tình cảm", "Đồng cảm", "Gắn kết mạnh mẽ"],
    challenges: ["Dễ bị ảnh hưởng bởi cảm xúc", "Không thích xung đột"],
  },
  Gold: {
    title: "Đề cao kỷ luật và trách nhiệm",
    content: `
            Bạn là người có trách nhiệm, kỷ luật và luôn làm việc theo kế hoạch rõ ràng.
            Bạn đề cao sự ổn định, đáng tin cậy và luôn hoàn thành công việc một cách xuất sắc.
            Bạn thích làm theo nguyên tắc, có tổ chức và luôn đặt ra những tiêu chuẩn cao cho bản thân.
        `,
    strengths: ["Đáng tin cậy", "Làm việc có kế hoạch", "Trung thành"],
    challenges: ["Bảo thủ", "Không thích thay đổi đột ngột"],
  },
  Orange: {
    title: "Sống năng động và luôn tìm kiếm sự sáng tạo",
    content: `
            Bạn là người thích phiêu lưu, sáng tạo và luôn tràn đầy năng lượng.
            Bạn không ngại thử thách mới, thích tự do, linh hoạt và sẵn sàng đón nhận mọi cơ hội đến với mình.
            Bạn có khả năng thích nghi cao, dễ dàng giải quyết vấn đề theo cách độc đáo của riêng mình.
        `,
    strengths: ["Linh hoạt", "Sáng tạo", "Tràn đầy năng lượng"],
    challenges: ["Bốc đồng", "Không thích bị ràng buộc"],
  },
  Green: {
    title: "Phân tích mọi thứ, sống theo logic của bản thân",
    content: `
            Bạn là người có trí tuệ sắc bén, thích tìm hiểu và khám phá thế giới xung quanh.
            Bạn luôn đặt ra những câu hỏi, tò mò về cách mọi thứ vận hành và thích phân tích để hiểu sâu hơn.
            Bạn coi trọng trí tuệ, tư duy phản biện và luôn tìm kiếm những giải pháp logic cho mọi vấn đề.
        `,
    strengths: ["Thông minh", "Tư duy phân tích", "Độc lập"],
    challenges: ["Xa cách về cảm xúc", "Quá lý trí"],
  },
};

export const quizzes: Quiz[] = [
  {
    question: "Nếu bạn đến một bữa tiệc mà không quen ai, bạn sẽ làm gì?",
    choices: [
      {
        text: "Bắt chuyện với ai đó trông thân thiện",
        color: "blue",
      },
      {
        text: "Quan sát không gian và tìm hiểu tình hình",
        color: "green",
      },
      {
        text: "Làm theo các quy tắc giao tiếp xã hội",
        color: "gold",
      },
      {
        text: "Bắt đầu một trò chơi hoặc thử thách vui nhộn",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi bạn đang đi du lịch và bị lạc đường, bạn sẽ làm gì?",
    choices: [
      {
        text: "Hỏi người dân địa phương để được giúp đỡ",
        color: "blue",
      },
      {
        text: "Dùng bản đồ hoặc tra cứu thông tin trên điện thoại",
        color: "green",
      },
      {
        text: "Đi theo con đường quen thuộc để tìm lối ra",
        color: "gold",
      },
      {
        text: "Tiếp tục khám phá mà không lo lắng",
        color: "orange",
      },
    ],
  },
  {
    question:
      "Bạn đang tham gia một cuộc họp quan trọng nhưng có ý kiến trái chiều, bạn sẽ làm gì?",
    choices: [
      {
        text: "Lắng nghe và cố gắng hòa giải các ý kiến khác nhau",
        color: "blue",
      },
      {
        text: "Đưa ra các lập luận logic để bảo vệ quan điểm của mình",
        color: "green",
      },
      {
        text: "Bám sát quy trình và nguyên tắc đã có",
        color: "gold",
      },
      {
        text: "Chủ động tìm cách giải quyết vấn đề một cách sáng tạo",
        color: "orange",
      },
    ],
  },
  {
    question: "Nếu bạn bị mất điện thoại và không nhớ số ai, bạn sẽ làm gì?",
    choices: [
      {
        text: "Tìm ai đó quen biết để nhờ giúp đỡ",
        color: "blue",
      },
      {
        text: "Cố nhớ lại những dấu hiệu có thể giúp tìm ra điện thoại",
        color: "green",
      },
      {
        text: "Bình tĩnh và báo cáo mất điện thoại theo quy trình",
        color: "gold",
      },
      {
        text: "Thử tìm kiếm khu vực xung quanh thật nhanh",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi phải đưa ra quyết định quan trọng, bạn thường",
    choices: [
      {
        text: "Tham khảo ý kiến của nhiều người thân thiết",
        color: "blue",
      },
      {
        text: "Phân tích kỹ lưỡng ưu/nhược điểm từng phương án",
        color: "green",
      },
      {
        text: "Dựa trên kinh nghiệm và các nguyên tắc đã có",
        color: "gold",
      },
      {
        text: "Chọn phương án mang lại trải nghiệm mới mẻ",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn xử lý công việc tồn đọng",
    choices: [
      {
        text: "Nhờ đồng đội hỗ trợ cùng giải quyết",
        color: "blue",
      },
      {
        text: "Sắp xếp theo mức độ ưu tiên bằng biểu đồ",
        color: "green",
      },
      {
        text: "Lập danh sách và làm theo từng bước đã định",
        color: "gold",
      },
      {
        text: "Xử lý ngẫu hứng theo cảm hứng",
        color: "orange",
      },
    ],
  },
  {
    question: "Trong buổi họp brainstorming, bạn thường",
    choices: [
      {
        text: "Khuyến khích mọi người chia sẻ ý tưởng",
        color: "blue",
      },
      {
        text: "Phân tích tính khả thi của các đề xuất",
        color: "green",
      },
      {
        text: "Đề nghị tuân thủ quy trình làm việc",
        color: "gold",
      },
      {
        text: "Đưa ra những ý tưởng táo bạo nhất",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn lựa chọn sách để đọc",
    choices: [
      {
        text: "Sách về các mối quan hệ và cảm xúc",
        color: "blue",
      },
      {
        text: "Sách khoa học/chuyên môn sâu",
        color: "green",
      },
      {
        text: "Sách self-help có hệ thống rõ ràng",
        color: "gold",
      },
      {
        text: "Sách phiêu lưu hoặc thể loại mới lạ",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi gặp thất bại, bạn",
    choices: [
      {
        text: "Tìm sự an ủi từ người thân",
        color: "blue",
      },
      {
        text: "Phân tích nguyên nhân để rút kinh nghiệm",
        color: "green",
      },
      {
        text: "Lập kế hoạch phục hồi chi tiết",
        color: "gold",
      },
      {
        text: "Xem đây là cơ hội để thử cách tiếp cận mới",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn chuẩn bị cho chuyến du lịch",
    choices: [
      {
        text: "Rủ nhiều bạn bè cùng tham gia",
        color: "blue",
      },
      {
        text: "Nghiên cứu kỹ về văn hóa địa phương",
        color: "green",
      },
      {
        text: "Lên lịch trình từng giờ chi tiết",
        color: "gold",
      },
      {
        text: "Chỉ mang theo vali và khám phá ngẫu hứng",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi làm việc nhóm, vai trò bạn thường đảm nhận là",
    choices: [
      {
        text: "Người hòa giải xung đột",
        color: "blue",
      },
      {
        text: "Người phân tích dữ liệu",
        color: "green",
      },
      {
        text: "Người lên timeline công việc",
        color: "gold",
      },
      {
        text: "Người đề xuất ý tưởng mới",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn học một kỹ năng mới",
    choices: [
      {
        text: "Học cùng nhóm bạn",
        color: "blue",
      },
      {
        text: "Nghiên cứu tài liệu chuyên sâu",
        color: "green",
      },
      {
        text: "Làm theo giáo trình có sẵn",
        color: "gold",
      },
      {
        text: "Thử nghiệm trực tiếp",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi chọn quà sinh nhật cho bạn thân, bạn sẽ",
    choices: [
      {
        text: "Chọn món quà ý nghĩa về tình bạn",
        color: "blue",
      },
      {
        text: "Tìm món quà thiết thực nhất",
        color: "green",
      },
      {
        text: "Mua theo truyền thống (hoa/thiệp)",
        color: "gold",
      },
      {
        text: "Tự làm quà handmade độc đáo",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn dọn dẹp tủ quần áo",
    choices: [
      {
        text: "Nhờ bạn bè tư vấn phong cách",
        color: "blue",
      },
      {
        text: "Phân loại theo màu sắc/chất liệu",
        color: "green",
      },
      {
        text: "Sắp xếp theo mùa rõ ràng",
        color: "gold",
      },
      {
        text: "Thử mix đồ theo cách mới",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi thấy hàng xóm gặp khó khăn, bạn",
    choices: [
      {
        text: "Đến hỏi thăm và đề nghị giúp đỡ",
        color: "blue",
      },
      {
        text: "Phân tích cách giải quyết hiệu quả",
        color: "green",
      },
      {
        text: "Liên hệ tổ dân phụ trách",
        color: "gold",
      },
      {
        text: "Nghĩ ra giải pháp sáng tạo",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn chọn nhà hàng ăn tối",
    choices: [
      {
        text: "Nơi có không khí ấm cúng",
        color: "blue",
      },
      {
        text: "Xem đánh giá chất lượng trên app",
        color: "green",
      },
      {
        text: "Đến quán quen đã biết trước",
        color: "gold",
      },
      {
        text: "Thử nhà hàng mới khai trương",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi phát hiện đồng nghiệp mắc lỗi",
    choices: [
      {
        text: "Nhẹ nhàng góp ý riêng",
        color: "blue",
      },
      {
        text: "Phân tích hậu quả của lỗi sai",
        color: "green",
      },
      {
        text: "Báo cáo với cấp trên",
        color: "gold",
      },
      {
        text: "Đề xuất cách làm mới để tránh lỗi",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn quản lý chi tiêu",
    choices: [
      {
        text: "Chi tiêu theo cảm xúc",
        color: "blue",
      },
      {
        text: "Lập bảng Excel phân tích",
        color: "green",
      },
      {
        text: "Theo ngân sách định sẵn",
        color: "gold",
      },
      {
        text: "Ưu tiên trải nghiệm hơn tiết kiệm",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi tập thể dục buổi sáng, bạn",
    choices: [
      {
        text: "Rủ bạn bè cùng tập",
        color: "blue",
      },
      {
        text: "Theo dõi chỉ số sức khỏe",
        color: "green",
      },
      {
        text: "Tập theo lịch trình cố định",
        color: "gold",
      },
      {
        text: "Thử các bài tập mới lạ",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn chọn phim để xem cuối tuần",
    choices: [
      {
        text: "Phim tâm lý tình cảm",
        color: "blue",
      },
      {
        text: "Phim tài liệu khoa học",
        color: "green",
      },
      {
        text: "Phim cổ điển đã xem nhiều lần",
        color: "gold",
      },
      {
        text: "Phim thể nghiệm nghệ thuật",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi điện thoại hết pin giữa chuyến đi",
    choices: [
      {
        text: "Hỏi mượn người lạ sạc nhờ",
        color: "blue",
      },
      {
        text: "Tìm cửa hàng tiện ích gần nhất",
        color: "green",
      },
      {
        text: "Luôn mang sẵn pin dự phòng",
        color: "gold",
      },
      {
        text: "Tận hưởng trải nghiệm offline",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn chăm sóc cây cảnh",
    choices: [
      {
        text: "Trò chuyện với cây mỗi ngày",
        color: "blue",
      },
      {
        text: "Nghiên cứu kỹ thuật trồng cây",
        color: "green",
      },
      {
        text: "Tưới nước theo lịch cố định",
        color: "gold",
      },
      {
        text: "Thử ghép cây tạo giống mới",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi đi siêu thị mua đồ",
    choices: [
      {
        text: "Mua thêm đồ để tặng bạn bè",
        color: "blue",
      },
      {
        text: "So sánh giá cả kỹ lưỡng",
        color: "green",
      },
      {
        text: "Theo danh sách đã lập sẵn",
        color: "gold",
      },
      {
        text: "Thử mua sản phẩm mới",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn giải quyết mâu thuẫn gia đình",
    choices: [
      {
        text: "Lắng nghe cảm xúc mọi người",
        color: "blue",
      },
      {
        text: "Phân tích nguyên nhân khách quan",
        color: "green",
      },
      {
        text: "Áp dụng cách giải quyết truyền thống",
        color: "gold",
      },
      {
        text: "Đề xuất phương án mới lạ",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi tham gia lớp học nấu ăn",
    choices: [
      {
        text: "Kết bạn với mọi người trong lớp",
        color: "blue",
      },
      {
        text: "Ghi chép tỉ mỉ công thức",
        color: "green",
      },
      {
        text: "Làm theo hướng dẫn từng bước",
        color: "gold",
      },
      {
        text: "Biến tấu công thức theo ý mình",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn chọn đồ trang trí nhà",
    choices: [
      {
        text: "Theo ý kiến của gia đình",
        color: "blue",
      },
      {
        text: "Phối màu theo nguyên tắc phong thủy",
        color: "green",
      },
      {
        text: "Chọn đồ trang trí truyền thống",
        color: "gold",
      },
      {
        text: "Thử phong cách khác biệt",
        color: "orange",
      },
    ],
  },
  {
    question: "Kếu bạn nhận được tin nhắn lạ",
    choices: [
      {
        text: "Hồi đáp để làm quen",
        color: "blue",
      },
      {
        text: "Kiểm tra nguồn gốc tin nhắn",
        color: "green",
      },
      {
        text: "Bỏ qua vì không quen biết",
        color: "gold",
      },
      {
        text: "Trả lời bằng câu đố vui",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn sử dụng mạng xã hội",
    choices: [
      {
        text: "Kết nối với bạn bè mọi lúc",
        color: "blue",
      },
      {
        text: "Đăng bài phân tích chuyên sâu",
        color: "green",
      },
      {
        text: "Chỉ like/share bài đã kiểm duyệt",
        color: "gold",
      },
      {
        text: "Thử các trend mới nhất",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi thấy trẻ em khóc nơi công cộng",
    choices: [
      {
        text: "Đến dỗ dành và hỏi nguyên nhân",
        color: "blue",
      },
      {
        text: "Quan sát xem có nguy hiểm không",
        color: "green",
      },
      {
        text: "Tìm bảo vệ/bố mẹ đứa bé",
        color: "gold",
      },
      {
        text: "Dùng trò chơi để đánh lạc hướng",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn chọn đồ uống",
    choices: [
      {
        text: "Chọn đồ uống theo nhóm bạn",
        color: "blue",
      },
      {
        text: "Xem thành phần dinh dưỡng",
        color: "green",
      },
      {
        text: "Uống loại quen thuộc",
        color: "gold",
      },
      {
        text: "Thử món mới lạ",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi đồng hồ báo thức reo",
    choices: [
      {
        text: "Nằm thêm chút trò chuyện với người thân",
        color: "blue",
      },
      {
        text: "Phân tích giấc ngủ bằng app",
        color: "green",
      },
      {
        text: "Dậy ngay theo thói quen",
        color: "gold",
      },
      {
        text: "Tắt chuông và ngủ thêm 5 phút",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn chọn thiệp chúc mừng",
    choices: [
      {
        text: "Viết lời chúc tay dài dòng",
        color: "blue",
      },
      {
        text: "Chọn thiệp có thiết kế tối giản",
        color: "green",
      },
      {
        text: "Mua thiệp có sẵn lời chúc",
        color: "gold",
      },
      {
        text: "Tự thiết kế thiệp độc đáo",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi phải làm việc ở nhà",
    choices: [
      {
        text: "Gọi video cùng đồng nghiệp",
        color: "blue",
      },
      {
        text: "Lập kế hoạch làm việc chi tiết",
        color: "green",
      },
      {
        text: "Tuân thủ giờ giấc như văn phòng",
        color: "gold",
      },
      {
        text: "Làm việc tại quán cafe mới",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn xử lý khi bị kẹt xe",
    choices: [
      {
        text: "Bắt chuyện với người xung quanh",
        color: "blue",
      },
      {
        text: "Tìm đường đi thay thế trên map",
        color: "green",
      },
      {
        text: "Chờ đợi theo đúng luật giao thông",
        color: "gold",
      },
      {
        text: "Rẽ vào con đường ít người qua lại",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi chọn khóa học mới",
    choices: [
      {
        text: "Học cùng nhóm bạn thân",
        color: "blue",
      },
      {
        text: "Nghiên cứu syllabus kỹ lưỡng",
        color: "green",
      },
      {
        text: "Chọn khóa học truyền thống",
        color: "gold",
      },
      {
        text: "Thử lĩnh vực hoàn toàn mới",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn sắp xếp kỳ nghỉ lễ",
    choices: [
      {
        text: "Tổ chức tiệc với gia đình",
        color: "blue",
      },
      {
        text: "Lên kế hoạch du lịch tỉ mỉ",
        color: "green",
      },
      {
        text: "Nghỉ ngơi tại nhà theo thói quen",
        color: "gold",
      },
      {
        text: "Đi phượt không lịch trình",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi thấy người lạ cười với mình",
    choices: [
      {
        text: "Mỉm cười đáp lại",
        color: "blue",
      },
      {
        text: "Phân tích động cơ của họ",
        color: "green",
      },
      {
        text: "Lờ đi vì không quen biết",
        color: "gold",
      },
      {
        text: "Bắt chuyện ngẫu nhiên",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn chọn đồ dùng văn phòng",
    choices: [
      {
        text: "Mua đồ phối hợp với đồng nghiệp",
        color: "blue",
      },
      {
        text: "Chọn sản phẩm có thông số kỹ thuật tốt",
        color: "green",
      },
      {
        text: "Dùng đồ công ty cung cấp",
        color: "gold",
      },
      {
        text: "Tự thiết kế đồ dùng cá nhân hóa",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi cần thư giãn cuối ngày",
    choices: [
      {
        text: "Gọi điện tâm sự với bạn",
        color: "blue",
      },
      {
        text: "Đọc sách chuyên môn",
        color: "green",
      },
      {
        text: "Xem chương trình TV quen thuộc",
        color: "gold",
      },
      {
        text: "Thử hoạt động nghệ thuật mới",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn ghi nhớ ngày đặc biệt",
    choices: [
      {
        text: "Nhắc mọi người cùng nhớ",
        color: "blue",
      },
      {
        text: "Lập danh sách trên ứng dụng",
        color: "green",
      },
      {
        text: "Đánh dấu trên lịch treo tường",
        color: "gold",
      },
      {
        text: "Tạo thông báo sáng tạo",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi tham gia sự kiện online",
    choices: [
      {
        text: "Tích cực chat kết nối với mọi người",
        color: "blue",
      },
      {
        text: "Ghi chép nội dung chi tiết",
        color: "green",
      },
      {
        text: "Tham gia đúng giờ theo lịch",
        color: "gold",
      },
      {
        text: "Thử hack các tính năng của nền tảng",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn chọn playlist nghe nhạc",
    choices: [
      {
        text: "Nhạc tâm trạng phù hợp với bạn bè",
        color: "blue",
      },
      {
        text: "Nhạc không lời để tập trung",
        color: "green",
      },
      {
        text: "Nghe lại playlist yêu thích",
        color: "gold",
      },
      {
        text: "Khám phá thể loại mới",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi phải chờ đợi lâu",
    choices: [
      {
        text: "Trò chuyện với người xung quanh",
        color: "blue",
      },
      {
        text: "Đọc tài liệu/sách mang theo",
        color: "green",
      },
      {
        text: "Xem đồng hồ và tính toán thời gian",
        color: "gold",
      },
      {
        text: "Nghịch điện thoại tạo trò vui",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn chọn đồ trang sức",
    choices: [
      {
        text: "Chọn mẫu được bạn bè khen",
        color: "blue",
      },
      {
        text: "Phân tích chất liệu và giá trị",
        color: "green",
      },
      {
        text: "Đeo đồ truyền thống gia đình",
        color: "gold",
      },
      {
        text: "Phối hợp phong cách khác lạ",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi thấy đồng nghiệp bị stress",
    choices: [
      {
        text: "Mời họ đi uống trò chuyện",
        color: "blue",
      },
      {
        text: "Phân tích nguyên nhân gây stress",
        color: "green",
      },
      {
        text: "Khuyên nghỉ ngơi theo quy định",
        color: "gold",
      },
      {
        text: "Rủ họ thử hoạt động giải tỏa mới",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn sử dụng thẻ giảm giá",
    choices: [
      {
        text: "Chia sẻ mã với bạn bè",
        color: "blue",
      },
      {
        text: "Tính toán lợi ích tối ưu",
        color: "green",
      },
      {
        text: "Dùng đúng hạn đã định",
        color: "gold",
      },
      {
        text: "Thử dùng cho sản phẩm mới",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi tham gia hội chợ việc làm",
    choices: [
      {
        text: "Kết nối với nhiều người",
        color: "blue",
      },
      {
        text: "Phân tích công ty tiềm năng",
        color: "green",
      },
      {
        text: "Chỉ tiếp cận công ty uy tín",
        color: "gold",
      },
      {
        text: "Thử ứng tuyển vị trí mới lạ",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn chọn kem đánh răng",
    choices: [
      {
        text: "Hỏi bạn bè loại họ dùng",
        color: "blue",
      },
      {
        text: "So sánh thành phần hóa học",
        color: "green",
      },
      {
        text: "Mua hãng đã dùng lâu năm",
        color: "gold",
      },
      {
        text: "Thử loại mới quảng cáo trên mạng",
        color: "orange",
      },
    ],
  },
  {
    question: "Khi phải nấu cơm khách",
    choices: [
      {
        text: "Hỏi khách về khẩu vị trước",
        color: "blue",
      },
      {
        text: "Lên thực đơn dinh dưỡng",
        color: "green",
      },
      {
        text: "Nấu món gia đình quen thuộc",
        color: "gold",
      },
      {
        text: "Thử công thức mới lạ",
        color: "orange",
      },
    ],
  },
  {
    question: "Cách bạn xử lý email rác",
    choices: [
      {
        text: "Tự tay xóa từng cái",
        color: "blue",
      },
      {
        text: "Phân loại để cải thiện bộ lọc",
        color: "green",
      },
      {
        text: "Dùng tính năng report spam",
        color: "gold",
      },
      {
        text: "Thử trả lời để xem phản ứng",
        color: "orange",
      },
    ],
  },
];
