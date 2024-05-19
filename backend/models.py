import enum
import uuid
from datetime import datetime
from typing import TYPE_CHECKING, TypedDict

from sqlalchemy import Column, DateTime, Enum, String
from sqlalchemy.dialects.postgresql import UUID

from config import db

if TYPE_CHECKING:
    from flask_sqlalchemy.model import Model
else:
    Model = db.Model


class UserType(enum.Enum):
    student = 1
    teacher = 2


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
    password = Column(
        String(120), unique=True, nullable=False
    )  # todo edit to make it correct
    user_type = Column(Enum(UserType), unique=False, nullable=False)

    def to_json(self) -> UserConfig:
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "password": self.password,
            "userType": self.user_type,
        }


class ClassConfig(TypedDict):
    id: str
    name: str
    code: str


class Class(Model):
    __tablename__ = "Class"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(80), unique=False, nullable=False)
    code = Column(String(80), unique=False, nullable=False)

    def to_json(self) -> ClassConfig:
        return {
            "id": self.id,
            "name": self.name,
            "code": self.code,
        }


class ActivityType(enum.Enum):
    task = 1
    event = 2


class ActivityConfig(TypedDict):
    id: str
    name: str
    decription: str | None
    date: datetime | None
    activityType: str


class Activity(Model):
    __tablename__ = "Activity"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(80), unique=False, nullable=False)
    description = Column(String(200), unique=False, nullable=True)
    date = Column(DateTime, unique=False, nullable=True)
    activity_type = Column(Enum(ActivityType), unique=False, nullable=False)

    def to_json(self) -> ActivityConfig:
        return {
            "id": self.id,
            "name": self.name,
            "decription": self.description,
            "date": self.date,
            "activityType": self.activity_type,
        }
