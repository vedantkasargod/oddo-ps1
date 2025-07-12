# backend/app/crud/crud_swap.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
from .. import models

async def get_swap_status_counts(db: AsyncSession) -> dict:
    """
    Counts swap requests grouped by their status.
    """
    query = select(models.SwapRequest.status, func.count(models.SwapRequest.id)).group_by(models.SwapRequest.status)
    result = await db.execute(query)
    
    # Initialize counts with 0
    status_counts = {
        "pending": 0,
        "accepted": 0,
        "rejected": 0,
        "completed": 0,
        "cancelled": 0,
    }
    
    # Fill in the counts from the database query
    for status, count in result.all():
        if status in status_counts:
            status_counts[status] = count
            
    return status_counts