# backend/app/schemas/user.py
import uuid
from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime
from typing import List

class UserBase(BaseModel):
    email: EmailStr
    name: str

class User(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    location: str | None = None
    availability: str | None = None
    profile_is_public: bool
    is_banned: bool
    role: str
    created_at: datetime