import json
import logging

import httpx

from .schemas import (
    ChatMessageRequest,
    ModerationResult,
    OllamaGenerateRequest,
    ViolationType,
)

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """Bạn là hệ thống kiểm duyệt nội dung tự động cho ứng dụng "Đồng hành & Healing" — một nền tảng kết nối người dùng với Companion để trò chuyện, cà phê, xem phim, hoặc healing trực tuyến. Đây KHÔNG phải ứng dụng hẹn hò hay dịch vụ tình dục.

## NHIỆM VỤ
Phân tích tin nhắn chat và phát hiện vi phạm. Trả về KẾT QUẢ duy nhất dưới dạng JSON.

## CÁC LOẠI VI PHẠM

### PROSTITUTION — Gạ gẫm / Mại dâm
- Yêu cầu tình dục, quan hệ thể xác, "qua đêm", "massage đặc biệt"
- Đề cập giá cho dịch vụ thân mật ("500k full service", "1 triệu qua đêm")
- Vi phạm quy tắc "không tiếp xúc thể chất ngoài bắt tay"
- Gợi ý bóng gió về tình dục dù dùng từ lóng hoặc viết tắt ("đi khách sạn", "về phòng anh", "dt" = dịch vụ thân)
- Từ khóa nghi ngờ: "full", "vip", "qua đêm", "phòng riêng", "tắm chung", "massage toàn thân"

### OFF_PLATFORM_DEAL — Giao dịch ngoài nền tảng
- Chia sẻ số điện thoại, Zalo, Telegram, Viber, Facebook Messenger
- Chia sẻ số tài khoản ngân hàng, ví MoMo, ZaloPay
- Gợi ý thanh toán trực tiếp để tránh phí nền tảng ("chuyển khoản cho anh", "trả tiền mặt cho chị")
- Mẫu regex nghi ngờ: dãy 10-11 chữ số liên tiếp (số điện thoại VN), "zalo", "fb", "telegram"

### HATE_SPEECH — Phát ngôn thù ghét
- Xúc phạm, phân biệt giới tính, chủng tộc, tôn giáo
- Đe dọa bạo lực, quấy rối

### NONE — Không vi phạm
- Tin nhắn bình thường về lịch hẹn, địa điểm công cộng, sở thích, trò chuyện xã giao

## QUY TẮC PHÂN TÍCH
1. Đọc toàn bộ tin nhắn, xem xét ngữ cảnh
2. Người Việt thường dùng từ lóng, viết tắt, teencode — hãy hiểu ý nghĩa thực sự
3. Nếu không chắc chắn, hãy đánh giá confidence_score thấp hơn thay vì flag nhầm
4. Tin nhắn thông thường về cà phê, phim, sự kiện → NONE

## ĐỊNH DẠNG OUTPUT — CHỈ TRẢ VỀ JSON, KHÔNG CÓ TEXT KHÁC
{
  "is_flagged": true/false,
  "violation_type": "NONE" | "PROSTITUTION" | "OFF_PLATFORM_DEAL" | "HATE_SPEECH",
  "reason": "giải thích ngắn gọn bằng tiếng Việt",
  "confidence_score": 0.0-1.0
}"""


class AIModerator:
    def __init__(self, ollama_base_url: str, model_name: str):
        self._base_url = ollama_base_url.rstrip("/")
        self._model = model_name
        self._generate_url = f"{self._base_url}/api/generate"

    async def moderate(self, request: ChatMessageRequest) -> ModerationResult:
        user_prompt = (
            f"[sender_role: {request.sender_role.value}]\n"
            f"[message_id: {request.message_id}]\n"
            f"Tin nhắn:\n\"{request.text_content}\""
        )

        ollama_payload = OllamaGenerateRequest(
            model=self._model,
            system=SYSTEM_PROMPT,
            prompt=user_prompt,
            stream=False,
            format="json",
            options={"temperature": 0.1, "num_predict": 256},
        )

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                resp = await client.post(
                    self._generate_url,
                    json=ollama_payload.model_dump(),
                )
                resp.raise_for_status()

            raw = resp.json()
            return self._parse_response(raw.get("response", ""), request.message_id)

        except httpx.ConnectError:
            logger.error("Ollama service unreachable at %s", self._generate_url)
            return self._fallback_result(request.message_id, "Ollama service unreachable")

        except httpx.TimeoutException:
            logger.error("Ollama request timed out for message %s", request.message_id)
            return self._fallback_result(request.message_id, "Ollama request timed out")

        except httpx.HTTPStatusError as exc:
            logger.error("Ollama HTTP error %s for message %s", exc.response.status_code, request.message_id)
            return self._fallback_result(request.message_id, f"Ollama HTTP {exc.response.status_code}")

        except Exception as exc:
            logger.exception("Unexpected error moderating message %s", request.message_id)
            return self._fallback_result(request.message_id, str(exc))

    def _parse_response(self, raw_text: str, message_id: str) -> ModerationResult:
        try:
            data = json.loads(raw_text)

            violation = data.get("violation_type", "NONE")
            if violation not in ViolationType.__members__:
                violation = "NONE"

            confidence = data.get("confidence_score", 0.0)
            if not isinstance(confidence, (int, float)):
                confidence = 0.0
            confidence = max(0.0, min(1.0, float(confidence)))

            return ModerationResult(
                message_id=message_id,
                is_flagged=bool(data.get("is_flagged", False)),
                violation_type=ViolationType(violation),
                reason=str(data.get("reason", "")),
                confidence_score=confidence,
            )
        except (json.JSONDecodeError, KeyError, ValueError) as exc:
            logger.warning("Failed to parse Ollama response for %s: %s — raw: %s", message_id, exc, raw_text[:200])
            return self._fallback_result(message_id, f"Parse error: {exc}")

    @staticmethod
    def _fallback_result(message_id: str, reason: str) -> ModerationResult:
        return ModerationResult(
            message_id=message_id,
            is_flagged=True,
            violation_type=ViolationType.MANUAL_REVIEW,
            reason=f"Tự động gắn cờ để kiểm duyệt thủ công — {reason}",
            confidence_score=0.0,
        )
