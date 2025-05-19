from __future__ import annotations
from pydantic import BaseModel, EmailStr
from typing import List
import uuid

from app.classroom.schemas import ClassroomRead
from app.user.models import UserType

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    user_type: UserType

class UserCreate(UserBase):
    password: str

    class Config:
        from_attributes = True


class UserRead(UserBase):
    id: uuid.UUID
    classrooms: List[ClassroomRead] = []

    class Config:
        from_attributes = True


class UserOut(BaseModel):
    id:        uuid.UUID
    first_name: str
    last_name:  str
    email:      EmailStr
    password:   str
    user_type:  UserType

    class Config:
        from_attributes = True
        use_enum_values = True