# RentLover — Backend AI Moderation Service

API kiểm duyệt nội dung chat thời gian thực sử dụng FastAPI + Ollama (Qwen).

## Yêu cầu

- Python 3.11+
- [Ollama](https://ollama.ai) đã cài đặt và đang chạy

## Cài đặt

### 1. Pull model Qwen qua Ollama

```bash
ollama pull qwen3:1.7b
```

Xác nhận Ollama đang chạy:

```bash
ollama list
# Kết quả phải hiển thị qwen3:1.7b
```

### 2. Cài đặt Python dependencies

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Cấu hình environment

```bash
cp .env.example .env
# Chỉnh sửa .env nếu Ollama chạy trên host/port khác
```

### 4. Chạy server

```bash
uvicorn app.main:app --reload --port 8000
```

Server sẽ khởi động tại `http://localhost:8000`.

## API Endpoints

### Health Check

```
GET /health
```

### Kiểm duyệt tin nhắn

```
POST /api/v1/moderate/chat
Content-Type: application/json

{
  "message_id": "msg_001",
  "sender_role": "user",
  "text_content": "Chào bạn, mình muốn hẹn cà phê cuối tuần này nhé!"
}
```

**Response (an toàn):**

```json
{
  "message_id": "msg_001",
  "is_flagged": false,
  "violation_type": "NONE",
  "reason": "Tin nhắn bình thường về lịch hẹn cà phê",
  "confidence_score": 0.95
}
```

**Response (vi phạm):**

```json
{
  "message_id": "msg_002",
  "is_flagged": true,
  "violation_type": "OFF_PLATFORM_DEAL",
  "reason": "Người dùng chia sẻ số điện thoại để liên lạc ngoài nền tảng",
  "confidence_score": 0.92
}
```

### Swagger UI

Truy cập `http://localhost:8000/docs` để xem interactive API documentation.

## Kiến trúc

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py            # FastAPI app, endpoint, CORS, lifespan
│   ├── schemas.py         # Pydantic models (request/response)
│   └── ai_moderator.py    # Ollama integration, system prompt, parsing
├── .env.example
├── requirements.txt
└── README.md
```

## Xử lý lỗi

Khi Ollama không khả dụng (offline, timeout, lỗi HTTP), hệ thống **không block** luồng chat. Thay vào đó, tin nhắn được tự động gắn cờ `MANUAL_REVIEW` để đội ngũ kiểm duyệt thủ công xử lý sau.
