from __future__ import annotations

import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ...core.security import create_access_token, hash_password, verify_password
from ...db.database import get_db
from ...db.models import User, UserRole
from ...schemas import LoginRequest, RegisterRequest, TokenResponse, UserResponse

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(body: RegisterRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.phone_number == body.phone_number))
    if result.scalar_one_or_none() is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Số điện thoại đã được đăng ký")

    user = User(
        phone_number=body.phone_number,
        hashed_password=hash_password(body.password),
        full_name=body.full_name,
        role=UserRole(body.role) if body.role else UserRole.USER,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    logger.info("User registered: %s (%s)", user.phone_number, user.role.value)
    return UserResponse(
        id=str(user.id),
        phone_number=user.phone_number,
        full_name=user.full_name,
        role=user.role.value,
        created_at=user.created_at,
    )


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.phone_number == body.phone_number))
    user = result.scalar_one_or_none()

    if user is None or not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Số điện thoại hoặc mật khẩu không đúng")

    token = create_access_token(subject=str(user.id), role=user.role.value)

    logger.info("User logged in: %s", user.phone_number)
    return TokenResponse(access_token=token, token_type="bearer")
