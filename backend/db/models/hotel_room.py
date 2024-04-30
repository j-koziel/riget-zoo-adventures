from typing import Literal
import uuid
from pydantic import BaseModel

class HotelRoom(BaseModel):
    id: str = str(uuid.uuid4())
    room_number: int
    dates_booked: list[str]
    price_per_night: str
    type: Literal["Jungle Cabin", "Desert Cave", "Snowy Igloo"]
    description: str
    num_beds: int
    free_wifi: bool = False
    img_src: str
    img_alt: str