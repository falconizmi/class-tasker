import enum
import uuid
from sqlalchemy import Column, String, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.base import Base

class ActivityType(enum.Enum):
    task = "task"
    event = "event"

    def __str__(self) -> str:
        return self.value

class Activity(Base):
    __tablename__ = "activity"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(80), nullable=False)
    description = Column(String(200), nullable=True)
    date = Column(DateTime, nullable=True)
    activity_type = Column(Enum(ActivityType, name="activity_type"), nullable=False)
    classroom_id = Column(UUID(as_uuid=True), ForeignKey("classroom.id"), nullable=False)

    # Many-to-One -> Classroom
    classroom = relationship(
        "Classroom",
        back_populates="activities",
    )