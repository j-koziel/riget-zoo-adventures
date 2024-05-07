import uuid
from typing import Literal
from datetime import datetime

from pydantic import BaseModel

from db.models.booking import Booking, HotelBooking

class User(BaseModel):
    id: str = ""
    disabled: bool = False
    type: Literal["free", "member"] = "free"
    name: str
    email: str
    password: str = ""
    password_confirm: str = ""
    dob: str
    previous_bookings: list[Booking | HotelBooking] = []
    upcoming_bookings: list[Booking | HotelBooking] = []
    date_created: str = str(datetime.now())
    read_articles: list = []
    zoo_visits: int = 0
    hotel_stays: int = 0
    num_articles_read: int = 0
    membership_duration: str = ""
    next_payment_date: str = ""
    points: int = 0
    points_gained: int = 0
    points_spent: int = 0
    num_quizzes_completed: int = 0
    quizzes_completed: list = []

class UserInDb(User):
    password_hash: str