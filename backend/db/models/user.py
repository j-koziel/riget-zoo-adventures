import uuid
from typing import Literal
from datetime import datetime, timedelta

from pydantic import BaseModel
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.db import Base
from db.models.booking import Booking, HotelBooking

class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    disabled: Mapped[bool] = mapped_column(False)
    type: Mapped[Literal["free", "member"]] = mapped_column("free")
    name: Mapped[str]
    email: Mapped[str]
    password_hash: Mapped[str]
    dob: Mapped[datetime]
    previous_bookings = relationship("BookingModel", back_populates="user")
    upcoming_bookings: Mapped[list]
    date_created: Mapped[datetime] = mapped_column(datetime.now())
    read_articles: Mapped[list] = mapped_column([])
    zoo_visits: Mapped[int] = mapped_column(0)
    hotel_stays: Mapped[int] = mapped_column(0)
    num_articles_read: Mapped[int] = mapped_column(0)
    membership_duration: Mapped[timedelta]
    next_payment_date: Mapped[datetime]
    points: Mapped[int] = mapped_column(0)
    points_gained: Mapped[int] = mapped_column(0)
    points_spent: Mapped[int] = mapped_column(0)
    num_quizzes_completed: Mapped[int] = mapped_column(0)
    quizzes_completed: Mapped[list] = mapped_column([])


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