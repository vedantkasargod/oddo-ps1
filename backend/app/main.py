# The final, correct version of backend/app/main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
import os
import redis.asyncio as aioredis
from .database import get_db

# --- ADD THIS IMPORT ---
from .api.v1.endpoints import admin as admin_router
from .api.v1.endpoints import admin as admin_user_router # Rename for clarity
from .api.v1.endpoints import admin_messages as admin_message_router
from .api.v1.endpoints import admin_stats as admin_stats_router


app = FastAPI(title="Skill Swap Platform Backend")

origins = [
    "http://localhost",
    "http://localhost:3000", # The default port for Next.js
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ADD THIS LINE ---
app.include_router(admin_router.router, prefix="/api/v1/admin", tags=["Admin"])
app.include_router(admin_message_router.router, prefix="/api/v1/admin/messages", tags=["Admin - Messaging"])
app.include_router(admin_stats_router.router, prefix="/api/v1/admin/stats", tags=["Admin - Statistics"])

async def get_redis_client():
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
    redis = aioredis.from_url(redis_url, decode_responses=True)
    try:
        yield redis
    finally:
        await redis.close()

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Skill Swap Platform API!"}

@app.get("/healthcheck")
async def healthcheck(db: AsyncSession = Depends(get_db), cache: aioredis.Redis = Depends(get_redis_client)):
    try:
        await db.execute(text("SELECT 1"))
        await cache.ping()
        return {"status": "ok", "database": "connected", "redis": "connected"}
    except Exception as e:
        raise e