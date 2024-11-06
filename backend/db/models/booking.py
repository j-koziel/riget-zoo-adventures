# import uuid
# from typing import Literal

# from pydantic import BaseModel
# from sqlalchemy import String
# from sqlalchemy.orm import Mapped, mapped_column, relationship

# from db.db import Base


# class BookingModel(Base):
#     __tablename__ = "previous_bookings"

#     id: Mapped[int] = mapped_column(primary_key=True)
#     user = relationship("UserModel", back_populates="previous_bookings")
#     type: Mapped[Literal["hotel", "zoo"]]
#     guest: Mapped[bool]
#     date: Mapped[str]
#     num_people: Mapped[int]
#     email: Mapped[str] = mapped_column("")
#     total_cost: Mapped[str]

# class Booking(BaseModel):
#     id: str = str(uuid.uuid4())
#     user_id: str = ""
#     type: Literal["hotel", "zoo"]
#     guest: bool
#     date: str
#     num_people: int
#     email: str = ""
#     total_cost: str

# class HotelBooking(Booking):
#     duration: str
#     hotel_room_id: str
