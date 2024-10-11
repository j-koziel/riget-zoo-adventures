from datetime import datetime, timedelta
from typing import Literal

from pydantic import BaseModel

from backend.db.models.booking import Booking, HotelBooking

class UserBase(BaseModel):
  email: str
  name: str
  
class UserCreate(UserBase):
  password: str
  dob: datetime

class User(UserBase):
    id: str = ""
    disabled: bool = False
    type: Literal["free", "member"] = "free"
    dob: datetime
    previous_bookings: list[Booking | HotelBooking] = []
    upcoming_bookings: list[Booking | HotelBooking] = []
    date_created: datetime = datetime.now()
    read_articles: list = []
    zoo_visits: int = 0
    hotel_stays: int = 0
    num_articles_read: int = 0
    membership_duration: timedelta = ""
    next_payment_date: datetime
    points: int = 0
    points_gained: int = 0
    points_spent: int = 0
    num_quizzes_completed: int = 0
    quizzes_completed: list = []
    password_hash: str