import uuid
import enum
from sqlalchemy import Column, Enum, ForeignKey, String, Table
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.models.association import user_class
from app.db.base import Base

class UserType(enum.Enum):
    student = "student"
    teacher = "teacher"

    def __str__(self):
        return self.value

class User(Base):
    __tablename__ = "user"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = Column(String(80), nullable=False)
    last_name = Column(String(80), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(120), nullable=False)
    user_type = Column(Enum(UserType, name="user_type"), nullable=False)

    # Many-to-Many -> Classrooms
    classrooms = relationship(
        "Classroom",
        secondary=user_class,
        back_populates="users",
    )