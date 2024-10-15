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
    disabled: bool = False
    type: Literal["free", "member"] = "free"
    dob: datetime
    # previous_bookings: list = []
    # upcoming_bookings: list = []
    date_created: datetime = datetime.now()
    read_articles: list = []
    zoo_visits: int = 0
    hotel_stays: int = 0
    num_articles_read: int = 0
    membership_duration: timedelta | None = None
    next_payment_date: datetime | None = None
    points: int = 0
    points_gained: int = 0
    points_spent: int = 0
    num_quizzes_completed: int = 0
    quizzes_completed: list = []
    password_hash: str