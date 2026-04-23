from enum import Enum

from pydantic import BaseModel, Field


class SenderRole(str, Enum):
    USER = "user"
    COMPANION = "companion"


class ViolationType(str, Enum):
    NONE = "NONE"
    PROSTITUTION = "PROSTITUTION"
    OFF_PLATFORM_DEAL = "OFF_PLATFORM_DEAL"
    HATE_SPEECH = "HATE_SPEECH"
    MANUAL_REVIEW = "MANUAL_REVIEW"


class ChatMessageRequest(BaseModel):
    message_id: str = Field(..., description="Unique message identifier")
    sender_role: SenderRole = Field(..., description="Role of the message sender")
    text_content: str = Field(..., min_length=1, max_length=5000, description="Message text to moderate")


class ModerationResult(BaseModel):
    message_id: str
    is_flagged: bool = Field(..., description="Whether the message violates policy")
    violation_type: ViolationType = Field(default=ViolationType.NONE)
    reason: str = Field(default="", description="Explanation of the violation")
    confidence_score: float = Field(default=0.0, ge=0.0, le=1.0, description="Model confidence 0-1")


class OllamaGenerateRequest(BaseModel):
    model: str
    prompt: str
    system: str
    stream: bool = False
    format: str = "json"
    options: dict | None = None


class OllamaGenerateResponse(BaseModel):
    response: str
    done: bool
