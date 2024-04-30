from pydantic import BaseModel


class ZooTicket(BaseModel):
    num_tickets: int = 100
    date: str
    is_available: bool = True