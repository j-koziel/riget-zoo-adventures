from datetime import datetime, timedelta
from typing import Literal

from pydantic import BaseModel

class UserBase(BaseModel):
  email: str
  name: str
  
class UserCreate(UserBase):
  password: str
  password_confirm: str
  dob: str


class User(UserBase):
    id: int
    disabled: bool
    type: Literal["free", "member"]
    dob: datetime
    # previous_bookings: list = []
    # upcoming_bookings: list = []
    date_created: datetime
    # read_articles: list = []
    zoo_visits: int | None
    hotel_stays: int | None
    num_articles_read: int | None
    membership_duration: timedelta | None
    next_payment_date: datetime | None
    points: int | None
    points_gained: int | None
    points_spent: int | None
    num_quizzes_completed: int | None
    # quizzes_completed: list | None
    password_hash: str
class UserPublic(UserBase):
    id: int
    disabled: bool
    type: Literal["free", "member"]
    dob: datetime
    # previous_bookings: list = []
    # upcoming_bookings: list = []
    date_created: datetime
    # read_articles: list = []
    zoo_visits: int | None
    hotel_stays: int | None
    num_articles_read: int | None
    membership_duration: timedelta | None
    next_payment_date: datetime | None
    points: int | None
    points_gained: int | None
    points_spent: int | None
    num_quizzes_completed: int | None
    # quizzes_completed: list = []


class StatusUpdateResponse(BaseModel):
  msg: str