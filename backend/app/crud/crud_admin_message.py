# backend/app/crud/crud_admin_message.py
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from .. import models
from ..schemas.admin_message import AdminMessageCreate

def create_admin_message(db: AsyncSession, *, message_in: AdminMessageCreate, admin_id: uuid.UUID) -> models.AdminMessage:
    """
    Creates a new admin message in the database.
    """
    db_message = models.AdminMessage(
        content=message_in.content,
        admin_id=admin_id
    )
    db.add(db_message)
    # Note: We don't commit here. We'll commit in the API endpoint.
    # This is a common pattern to allow for more complex transactions.
    return db_message