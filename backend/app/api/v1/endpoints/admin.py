# backend/app/api/v1/endpoints/admin.py
import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession

from ....database import get_db
from ....schemas import user as user_schema
from ....crud import crud_user

router = APIRouter()

async def get_current_admin_user(x_user_role: str = Header()):
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized, admin role required")
    return {"role": "admin"}

@router.get("/users/", response_model=List[user_schema.User], summary="Get All Users")
async def get_all_users(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db), admin_user: dict = Depends(get_current_admin_user)):
    users = await crud_user.get_users(db, skip=skip, limit=limit)
    return users

@router.put("/users/{user_id}/ban", response_model=user_schema.User, summary="Ban a User")
async def ban_user(user_id: uuid.UUID, db: AsyncSession = Depends(get_db), admin_user: dict = Depends(get_current_admin_user)):
    db_user = await crud_user.get_user_by_id(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return await crud_user.update_user_ban_status(db=db, db_user=db_user, is_banned=True)

@router.put("/users/{user_id}/unban", response_model=user_schema.User, summary="Unban a User")
async def unban_user(user_id: uuid.UUID, db: AsyncSession = Depends(get_db), admin_user: dict = Depends(get_current_admin_user)):
    db_user = await crud_user.get_user_by_id(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return await crud_user.update_user_ban_status(db=db, db_user=db_user, is_banned=False)