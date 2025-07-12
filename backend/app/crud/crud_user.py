# backend/app/crud/crud_user.py
import uuid
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .. import models

async def get_users(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[models.User]:
    result = await db.execute(select(models.User).offset(skip).limit(limit))
    return result.scalars().all()

async def get_user_by_id(db: AsyncSession, user_id: uuid.UUID) -> models.User | None:
    result = await db.execute(select(models.User).filter(models.User.id == user_id))
    return result.scalars().first()

async def update_user_ban_status(db: AsyncSession, db_user: models.User, is_banned: bool) -> models.User:
    db_user.is_banned = is_banned
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user