from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.db import Base
from db.models.day import DayModel

class ZooTicketModel(Base):
    __tablename__ = "zoo_tickets"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id = mapped_column(ForeignKey("users.id"), nullable=True)
    day_id = mapped_column(ForeignKey("days.id"))
    

    day = relationship("DayModel", back_populates="tickets", lazy="joined")
    user = relationship("UserModel", back_populates="zoo_tickets", lazy="joined")
