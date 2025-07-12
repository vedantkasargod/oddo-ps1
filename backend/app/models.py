# backend/app/models.py
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, Integer, Text, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from .database import Base
from sqlalchemy import text # Add this import

class User(Base):
    __tablename__ = "users"

    # In the User class
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"), default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    location = Column(String(255), nullable=True)
    profile_photo_url = Column(String(255), nullable=True)
    availability = Column(Text, nullable=True) # e.g., "weekends, evenings"
    profile_is_public = Column(Boolean, default=True, nullable=False)
    is_banned = Column(Boolean, default=False, nullable=False)
    role = Column(Enum('user', 'admin', name='user_role_enum'), default='user', nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    offered_skills = relationship("UserOfferedSkill", back_populates="user")
    wanted_skills = relationship("UserWantedSkill", back_populates="user")
    sent_swap_requests = relationship("SwapRequest", foreign_keys="[SwapRequest.requester_id]", back_populates="requester")
    received_swap_requests = relationship("SwapRequest", foreign_keys="[SwapRequest.receiver_id]", back_populates="receiver")
    sent_ratings = relationship("Rating", foreign_keys="[Rating.rater_id]", back_populates="rater")
    received_ratings = relationship("Rating", foreign_keys="[Rating.ratee_id]", back_populates="ratee")
    admin_messages = relationship("AdminMessage", back_populates="admin")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)
    is_inappropriate = Column(Boolean, default=False, nullable=False)

    offered_by_users = relationship("UserOfferedSkill", back_populates="skill")
    wanted_by_users = relationship("UserWantedSkill", back_populates="skill")
    swap_requests_offered = relationship("SwapRequest", foreign_keys="[SwapRequest.requester_skill_id]", back_populates="requester_skill")
    swap_requests_wanted = relationship("SwapRequest", foreign_keys="[SwapRequest.receiver_skill_id]", back_populates="receiver_skill")


class UserOfferedSkill(Base):
    __tablename__ = "user_offered_skills"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), primary_key=True)

    user = relationship("User", back_populates="offered_skills")
    skill = relationship("Skill", back_populates="offered_by_users")

class UserWantedSkill(Base):
    __tablename__ = "user_wanted_skills"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), primary_key=True)

    user = relationship("User", back_populates="wanted_skills")
    skill = relationship("Skill", back_populates="wanted_by_users")

class SwapRequest(Base):
    __tablename__ = "swap_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"), default=uuid.uuid4)
    requester_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    receiver_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    requester_skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    receiver_skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    message = Column(Text, nullable=True)
    status = Column(Enum('pending', 'accepted', 'rejected', 'completed', 'cancelled', name='swap_status_enum'), default='pending', nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    requester = relationship("User", foreign_keys=[requester_id], back_populates="sent_swap_requests")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_swap_requests")
    requester_skill = relationship("Skill", foreign_keys=[requester_skill_id], back_populates="swap_requests_offered")
    receiver_skill = relationship("Skill", foreign_keys=[receiver_skill_id], back_populates="swap_requests_wanted")
    rating = relationship("Rating", back_populates="swap", uselist=False) # One-to-one relationship

class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    swap_id = Column(UUID(as_uuid=True), ForeignKey("swap_requests.id"), nullable=False)
    rater_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    ratee_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    rating = Column(Integer, nullable=False) # 1-5
    feedback = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    swap = relationship("SwapRequest", back_populates="rating")
    rater = relationship("User", foreign_keys=[rater_id], back_populates="sent_ratings")
    ratee = relationship("User", foreign_keys=[ratee_id], back_populates="received_ratings")


class AdminMessage(Base):
    __tablename__ = "admin_messages"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"), default=uuid.uuid4)
    admin_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    admin = relationship("User", back_populates="admin_messages")