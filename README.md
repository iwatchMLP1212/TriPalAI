# TriPalAI – Trợ lý học tập AI cho học sinh Việt Nam

TriPalAI là nền tảng trợ lý học tập cá nhân hóa dành cho học sinh THCS & THPT tại Việt Nam. Ứng dụng AI được huấn luyện từ chương trình sách giáo khoa chính thống, có khả năng tương tác thời gian thực, phản hồi theo tính cách người học (mô hình True Colors), và hỗ trợ học sinh trong quá trình tự học mà không cần phụ thuộc vào học thêm.

---

## 🧩 Công nghệ sử dụng

| Thành phần | Công nghệ                         |
| ---------- | --------------------------------- |
| Frontend   | React / Next.js                   |
| Backend    | FastAPI (Python)                  |
| Database   | PostgreSQL + Drizzle ORM          |
| Auth       | NextAuth.js                       |
| AI Model   | OpenAI API (fine-tuned GPT model) |
| Icon UI    | Lucide Icons                      |
| Dev Langs  | TypeScript, JavaScript, Python    |

---

## 🚀 Hướng dẫn chạy local

### Backend

Tải backend theo hướng dẫn từ repo:
https://github.com/iwatchMLP1212/TriPalAI---Backend.git

### 1. Clone repo

```bash
git clone https://github.com/iwatchMLP1212/TriPalAI.git
```

### 2. Truy cập vào thư mục

```bash
cd tripalai
```

### 3. Tải dependency

```bash
npm install
```

### 4. Build app

```bash
npx next build
```

### 5. Khởi động

```bash
npx next start
```

### 6. Truy cập

```bash
- Local:        http://localhost:3000
- Network:      http://192.168.1.9:3000
```
