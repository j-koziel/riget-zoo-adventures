from typing import Literal
import uuid

from pydantic import BaseModel
from pydantic import BaseModel
from sqlalchemy.orm import Mapped, mapped_column

from db.db import Base

class HotelRoomModel(Base):
    id: Mapped[str] = mapped_column(primary_key=True)
    room_number: Mapped[int]
    dates_booked: Mapped[list[str]]
    price_per_night: Mapped[str]
    type: Mapped[Literal["Jungle Cabin", "Desert Cave", "Snowy Igloo"]]
    description: Mapped[str]
    num_beds: Mapped[int]
    free_wifi: Mapped[bool] = mapped_column(False)
    img_src: Mapped[str]
    img_alt: Mapped[str]

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