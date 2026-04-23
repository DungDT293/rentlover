from __future__ import annotations

import json
import logging
import uuid
from datetime import datetime, timezone

from fastapi import WebSocket, WebSocketDisconnect

from ..ai_moderator import AIModerator
from ..schemas import ChatMessageRequest, SenderRole

logger = logging.getLogger(__name__)


class ConnectionManager:
    def __init__(self) -> None:
        self._rooms: dict[str, list[WebSocket]] = {}

    async def connect(self, room_id: str, websocket: WebSocket) -> None:
        await websocket.accept()
        self._rooms.setdefault(room_id, []).append(websocket)
        logger.info("Client connected to room %s — total: %d", room_id, len(self._rooms[room_id]))

    def disconnect(self, room_id: str, websocket: WebSocket) -> None:
        conns = self._rooms.get(room_id, [])
        if websocket in conns:
            conns.remove(websocket)
        if not conns:
            self._rooms.pop(room_id, None)
        logger.info("Client disconnected from room %s — remaining: %d", room_id, len(conns))

    async def broadcast(self, room_id: str, message: dict, *, exclude: WebSocket | None = None) -> None:
        conns = self._rooms.get(room_id, [])
        dead: list[WebSocket] = []
        for ws in conns:
            if ws is exclude:
                continue
            try:
                await ws.send_json(message)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.disconnect(room_id, ws)

    async def send_personal(self, websocket: WebSocket, message: dict) -> None:
        try:
            await websocket.send_json(message)
        except Exception:
            logger.warning("Failed to send personal message")

    @property
    def active_rooms(self) -> int:
        return len(self._rooms)

    def room_count(self, room_id: str) -> int:
        return len(self._rooms.get(room_id, []))


manager = ConnectionManager()


async def chat_endpoint(websocket: WebSocket, room_id: str, moderator: AIModerator | None) -> None:
    await manager.connect(room_id, websocket)

    try:
        while True:
            raw = await websocket.receive_text()

            try:
                data = json.loads(raw)
            except json.JSONDecodeError:
                await manager.send_personal(websocket, {
                    "type": "error",
                    "message": "Invalid JSON format",
                })
                continue

            sender_role = data.get("sender_role", "user")
            text = data.get("text", "").strip()
            sender_name = data.get("sender_name", "Ẩn danh")

            if not text:
                continue

            message_id = f"msg_{uuid.uuid4().hex[:12]}"
            timestamp = datetime.now(timezone.utc).isoformat()

            if moderator is not None:
                mod_request = ChatMessageRequest(
                    message_id=message_id,
                    sender_role=SenderRole(sender_role) if sender_role in ("user", "companion") else SenderRole.USER,
                    text_content=text,
                )
                result = await moderator.moderate(mod_request)

                if result.is_flagged:
                    logger.warning(
                        "Message BLOCKED in room %s: type=%s reason=%s",
                        room_id, result.violation_type.value, result.reason,
                    )
                    await manager.send_personal(websocket, {
                        "type": "moderation_warning",
                        "message_id": message_id,
                        "message": "Tin nhắn vi phạm tiêu chuẩn an toàn và đã bị ẩn.",
                        "violation_type": result.violation_type.value,
                    })
                    continue

            broadcast_msg = {
                "type": "chat_message",
                "message_id": message_id,
                "room_id": room_id,
                "sender_role": sender_role,
                "sender_name": sender_name,
                "text": text,
                "timestamp": timestamp,
            }
            await manager.broadcast(room_id, broadcast_msg)

    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)
        await manager.broadcast(room_id, {
            "type": "system",
            "message": "Một người dùng đã rời phòng chat.",
            "timestamp": datetime.now(timezone.utc).isoformat(),
        })
