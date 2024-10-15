
from typing import Literal
from datetime import datetime, timedelta

from sqlalchemy.orm import Mapped, mapped_column

from db.db import Base


class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    disabled: Mapped[bool] = mapped_column(default=False)
    type: Mapped[Literal["free", "member"]] = mapped_column(default="free")
    name: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    password_hash: Mapped[str]
    dob: Mapped[datetime]
    # previous_bookings = relationship("BookingModel", back_populates="user")
    # upcoming_bookings: Mapped[list]
    date_created: Mapped[datetime] = mapped_column(default=datetime.now())
    # read_articles: Mapped[List] = mapped_column(default=[])
    zoo_visits: Mapped[int] = mapped_column(nullable=True)
    hotel_stays: Mapped[int] = mapped_column(nullable=True)
    num_articles_read: Mapped[int] = mapped_column(nullable=True)
    membership_duration: Mapped[timedelta | None] = mapped_column(nullable=True)
    next_payment_date: Mapped[datetime] = mapped_column(nullable=True)
    points: Mapped[int] = mapped_column(nullable=True)
    points_gained: Mapped[int] = mapped_column(nullable=True)
    points_spent: Mapped[int] = mapped_column(nullable=True)
    num_quizzes_completed: Mapped[int] = mapped_column(nullable=True)
    # quizzes_completed: Mapped[List] = mapped_column(default=[])