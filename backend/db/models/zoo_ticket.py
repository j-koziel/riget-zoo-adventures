import uuid
from pydantic import BaseModel
from sqlalchemy.orm import Mapped, mapped_column

from db.db import Base


class ZooTicketModel(Base):
    __tablename__ = "zoo_tickets"

    id: Mapped[int] = mapped_column(primary_key=True)
    num_tickets: Mapped[int] = mapped_column(default=0)
    date: Mapped[str]
    is_available: Mapped[bool] = mapped_column(default=True)


class ZooTicket(BaseModel):
    id: str = str(uuid.uuid4())
    num_tickets: int = 0
    date: str
    is_available: bool = True