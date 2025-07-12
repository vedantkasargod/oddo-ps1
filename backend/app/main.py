"""
main.py - FastAPI entrypoint for Skill Swap Platform Backend
"""

import os
from fastapi import FastAPI, Depends, HTTPException
from .database import get_db, engine, Base
from . import models  # Import models to ensure they are registered with Base
import redis.asyncio as aioredis  # For Redis connection
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text # <-- ADD THIS IMPORT
from redis.asyncio import Redis
from typing import AsyncGenerator

app = FastAPI(title="Skill Swap Platform Backend")

async def get_redis_client() ->  AsyncGenerator[Redis, None]:
    """
    Dependency to provide a Redis client.
    Uses REDIS_URL env var or defaults to localhost.
    """
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
    redis_client = aioredis.from_url(redis_url)
    try:
        yield redis_client
    finally:
        await redis_client.close()

@app.on_event("startup")
async def startup() -> None:
    """
    Application startup event handler.
    """
    print("Application starting up...")
    # Uncomment below for local dev if not using Alembic
    # async with engine.begin() as conn:
    #     await conn.run_sync(Base.metadata.create_all)
    print("Database models registered.")

@app.on_event("shutdown")
async def shutdown() -> None:
    """
    Application shutdown event handler.
    """
    print("Application shutting down.")
    await engine.dispose()  # Close database connection pool

@app.get("/")
async def read_root() -> dict:
    """
    Root endpoint for API.
    """
    return {"message": "Welcome to the Skill Swap Platform API!"}

@app.get("/healthcheck")
async def healthcheck(
    db: AsyncSession = Depends(get_db),
    cache: Redis = Depends(get_redis_client)
) -> dict:
    """
    Healthcheck endpoint to verify DB and Redis connectivity.
    """
    try:
        # Test DB connection
        await db.execute(text("SELECT 1")) # <-- WRAP IT IN text()
        # Test Redis connection
        await cache.ping()
        return {"status": "ok", "database": "connected", "redis": "connected"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Healthcheck failed: {e}")

# Additional endpoints (authentication, user management, etc.) can be added below.