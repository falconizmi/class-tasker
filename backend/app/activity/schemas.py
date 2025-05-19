from __future__ import annotations
from pydantic import BaseModel
from typing import Optional
import uuid
from datetime import datetime
from app.activity.models import ActivityType

class ActivityBase(BaseModel):
    name: str
    description: Optional[str] = None
    date: Optional[datetime] = None
    activity_type: ActivityType
    classroom_id: uuid.UUID

class ActivityRead(ActivityBase):
    id: uuid.UUID

    class Config:
        from_attributes = True
        use_enum_values = True

class ActivityCreate(ActivityBase):

    class Config:
        from_attributes = True
        use_enum_values = True