from __future__ import annotations
from pydantic import BaseModel
from typing import List
import uuid

from app.activity.schemas import ActivityRead


class ClassroomBase(BaseModel):
    name: str
    code: str
    activities: List[ActivityRead] = []

class ClassroomRead(ClassroomBase):
    id: uuid.UUID

    class Config:
        from_attributes = True

class ClassroomCreate(ClassroomBase):

    class Config:
        from_attributes = True

