import uuid
from typing import Literal

from pydantic import BaseModel

class Booking(BaseModel):
    id: str = str(uuid.uuid4())
    user_id: str = ""
    type: Literal["hotel", "zoo"]
    guest: bool
    date: str
    num_people: int
    email: str = ""
    total_cost: str

class HotelBooking(Booking):
    duration: str
    hotel_room_id: str
