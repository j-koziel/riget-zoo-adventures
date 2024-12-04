from datetime import datetime

from pydantic import BaseModel

class ZooTicket(BaseModel):
    id: int
    num_tickets: int = 0
    date: str
    is_available: bool = True


class ZooTicketCreate(BaseModel):
    date: str
    user_id: int | None


class DayCreate(BaseModel):
    date: datetime
    is_available: bool
    num_tickets: int