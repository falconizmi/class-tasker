import enum
import uuid
from datetime import datetime
from typing import TYPE_CHECKING, TypedDict

from sqlalchemy import Column, DateTime, Enum, ForeignKey, String, Table
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from config import db
from utils import to_js_isoformat

if TYPE_CHECKING:
    from flask_sqlalchemy.model import Model
else:
    Model = db.Model

class UserType(enum.Enum):
    student = 1
    teacher = 2

    def __str__(self):
        return str(self.name.lower())

class UserConfig(TypedDict):
    id: str
    firstName: str
    lastName: str
    email: str
    password: str
    userType: str

class User(Model):
    __tablename__ = "User"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = Column(String(80), unique=False, nullable=False)
    last_name = Column(String(80), unique=False, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(120), unique=True, nullable=False)  # todo edit to make it correct
    user_type = Column(Enum(UserType), unique=False, nullable=False)

    # Many-to-Many relationship with Class
    classes = relationship('Class', secondary='user_class', back_populates='users')

    def to_json(self) -> UserConfig:
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "password": self.password,
            "userType": str(self.user_type),
        }

class ClassConfig(TypedDict):
    id: str
    name: str
    code: str

class Class(Model):
    __tablename__ = "Class"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(80), unique=False, nullable=False)
    code = Column(String(80), unique=True, nullable=False)

    # Many-to-Many relationship with User
    users = relationship('User', secondary='user_class', back_populates='classes')

    # One-to-Many relationship with Activity
    activities = relationship('Activity', back_populates='class_')

    def to_json(self) -> ClassConfig:
        return {
            "id": self.id,
            "name": self.name,
            "code": self.code,
        }

# Association table for the many-to-many relationship between User and Class
user_class = Table(
    'user_class',
    db.Model.metadata,
    Column('user_id', UUID(as_uuid=True), ForeignKey('User.id'), primary_key=True),
    Column('class_id', UUID(as_uuid=True), ForeignKey('Class.id'), primary_key=True)
)

class ActivityType(enum.Enum):
    task = 1
    event = 2

    def __str__(self):
        return str(self.name.lower())

class ActivityConfig(TypedDict):
    id: str
    name: str
    description: str | None
    date: datetime | None
    activityType: str
    classId: str

class Activity(Model):
    __tablename__ = "Activity"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(80), unique=False, nullable=False)
    description = Column(String(200), unique=False, nullable=True)
    date = Column(DateTime, unique=False, nullable=True)
    activity_type = Column(Enum(ActivityType), unique=False, nullable=False)
    class_id = Column(UUID(as_uuid=True), ForeignKey('Class.id'), nullable=False)

    # Many-to-One relationship with Class
    class_ = relationship('Class', back_populates='activities')

    def to_json(self) -> ActivityConfig:
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "date": to_js_isoformat(self.date),
            "activityType": str(self.activity_type),
            "classId": self.class_id
        }