from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

user_class = Table(
    "user_class",
    Base.metadata,
    Column("user_id", UUID(as_uuid=True), ForeignKey("user.id"), primary_key=True),
    Column("classroom_id", UUID(as_uuid=True), ForeignKey("classroom.id"), primary_key=True),
)