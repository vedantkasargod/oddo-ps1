# backend/app/api/v1/endpoints/admin_messages.py
import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession

# Use the number of dots that works for your linter (e.g., ... or ....)
from ....database import get_db
from ....schemas import admin_message as message_schema
from ....crud import crud_admin_message
from ....crud import crud_user
from .admin import get_current_admin_user # We can reuse our security guard

router = APIRouter()

@router.post("/", response_model=message_schema.AdminMessage, status_code=201, summary="Send a Platform-Wide Message")
async def send_platform_message(
    *,
    db: AsyncSession = Depends(get_db),
    message_in: message_schema.AdminMessageCreate,
    admin_user: dict = Depends(get_current_admin_user)
):
    """
    Admin endpoint to create and send a new platform-wide message.
    """
    # Use the known main admin UUID
    main_admin_id = uuid.UUID("5c9df997-25ed-4b81-bc93-bfe338724c6b")
    message = crud_admin_message.create_admin_message(
        db=db, message_in=message_in, admin_id=main_admin_id
    )
    await db.commit()
    await db.refresh(message)
    return message