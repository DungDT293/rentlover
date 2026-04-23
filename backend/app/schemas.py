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


class PresignedUploadRequest(BaseModel):
    file_name: str = Field(..., min_length=1, max_length=255, description="Original file name")
    file_type: str = Field(..., description="MIME type (e.g. image/jpeg, video/mp4)")
    folder: str = Field(default="uploads", description="Storage folder prefix")


class PresignedUploadResponse(BaseModel):
    upload_url: str = Field(..., description="Pre-signed PUT URL for direct upload")
    object_key: str = Field(..., description="Storage object key")
    expires_in: int = Field(..., description="URL expiry in seconds")
    public_url: str = Field(..., description="Public CDN URL after upload")
