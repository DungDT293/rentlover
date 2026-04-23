import logging
import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .ai_moderator import AIModerator
from .schemas import ChatMessageRequest, ModerationResult

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen3:1.7b")

moderator: AIModerator | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global moderator
    moderator = AIModerator(ollama_base_url=OLLAMA_BASE_URL, model_name=OLLAMA_MODEL)
    logger.info("AI Moderator initialized — model=%s, ollama=%s", OLLAMA_MODEL, OLLAMA_BASE_URL)
    yield
    moderator = None
    logger.info("AI Moderator shut down")


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


@app.get("/health")
async def health_check():
    return {"status": "ok", "model": OLLAMA_MODEL}


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
