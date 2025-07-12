# backend/app/schemas/stats.py
from pydantic import BaseModel

class SwapStatusStats(BaseModel):
    pending: int
    accepted: int
    rejected: int
    completed: int
    cancelled: int