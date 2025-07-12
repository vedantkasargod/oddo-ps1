# backend/app/schemas/admin_message.py
import uuid
from pydantic import BaseModel, ConfigDict
from datetime import datetime

# The basic data needed to create a message
class AdminMessageCreate(BaseModel):
    content: str

# The full message data that we will return from the API
class AdminMessage(AdminMessageCreate):
    model_config = ConfigDict(from_attributes=True)
    
    id: uuid.UUID
    admin_id: uuid.UUID
    created_at: datetime