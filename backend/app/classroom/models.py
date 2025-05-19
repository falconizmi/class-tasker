import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.base import Base
from app.models.association import user_class

class Classroom(Base):
    __tablename__ = "classroom"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(80), nullable=False)
    code = Column(String(80), unique=True, nullable=False)

    # Many-to-Many -> Users
    users = relationship(
        "User",
        secondary=user_class,
        back_populates="classrooms",
    )

    # One-to-Many -> Activities
    activities = relationship(
        "Activity",
        back_populates="classroom",
        cascade="all, delete-orphan",
    )

