import logging
import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Query, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from .ai_moderator import AIModerator
from .api.deps import get_current_user
from .api.routers.auth import router as auth_router
from .db.database import engine
from .db.models import Base, User
from .schemas import ChatMessageRequest, ModerationResult, PresignedUploadRequest, PresignedUploadResponse
from .services.storage import R2Storage, create_r2_storage
from .websockets.chat import chat_endpoint, manager

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen3:1.7b")

moderator: AIModerator | None = None
r2_storage: R2Storage | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global moderator, r2_storage

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database tables created / verified")

    moderator = AIModerator(ollama_base_url=OLLAMA_BASE_URL, model_name=OLLAMA_MODEL)
    logger.info("AI Moderator initialized — model=%s, ollama=%s", OLLAMA_MODEL, OLLAMA_BASE_URL)

    r2_storage = create_r2_storage()
    if r2_storage:
        logger.info("R2 Storage initialized")
    else:
        logger.warning("R2 Storage not configured — media upload disabled")

    yield

    moderator = None
    r2_storage = None
    await engine.dispose()
    logger.info("Services shut down")


app = FastAPI(
    title="RentLover AI Moderation API",
    description="Real-time chat moderation for the Companion & Healing platform",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "model": OLLAMA_MODEL,
        "media_upload": r2_storage is not None,
        "active_chat_rooms": manager.active_rooms,
    }


@app.post("/api/v1/moderate/chat", response_model=ModerationResult)
async def moderate_chat(request: ChatMessageRequest):
    if moderator is None:
        raise HTTPException(status_code=503, detail="Moderation service not initialized")

    logger.info("Moderating message %s from %s", request.message_id, request.sender_role.value)
    result = await moderator.moderate(request)
    logger.info(
        "Result for %s: flagged=%s type=%s confidence=%.2f",
        result.message_id, result.is_flagged, result.violation_type.value, result.confidence_score,
    )
    return result


@app.post("/api/v1/media/upload-url", response_model=PresignedUploadResponse)
async def create_upload_url(request: PresignedUploadRequest, current_user: User = Depends(get_current_user)):
    if r2_storage is None:
        raise HTTPException(status_code=503, detail="Media upload service not configured")

    try:
        result = r2_storage.generate_presigned_upload_url(
            file_name=request.file_name,
            file_type=request.file_type,
            folder=request.folder,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    return PresignedUploadResponse(**result)


@app.websocket("/ws/chat/{room_id}")
async def websocket_chat(websocket: WebSocket, room_id: str, token: str = Query(...)):
    await chat_endpoint(websocket, room_id, moderator, token=token)
