# backend/app/api/v1/endpoints/admin_stats.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ....database import get_db
from ....schemas import stats as stats_schema
from ....crud import crud_swap
from .admin import get_current_admin_user

router = APIRouter()

@router.get("/swaps/", response_model=stats_schema.SwapStatusStats, summary="Get Swap Status Statistics")
async def get_swap_stats(
    db: AsyncSession = Depends(get_db),
    admin_user: dict = Depends(get_current_admin_user)
):
    """
    Admin endpoint to retrieve a count of swaps for each status.
    """
    stats = await crud_swap.get_swap_status_counts(db)
    return stats