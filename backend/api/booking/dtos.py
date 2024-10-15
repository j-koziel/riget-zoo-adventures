from pydantic import BaseModel

class ZooTicket(BaseModel):
    id: int
    num_tickets: int = 0
    date: str
    is_available: bool = True