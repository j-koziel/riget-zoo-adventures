from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.db import Base

class DayModel(Base):
  __tablename__ = "days"

  id: Mapped[int] = mapped_column(primary_key=True)
  tickets = relationship("ZooTicketModel", back_populates="day", lazy="joined")
  date: Mapped[datetime] = mapped_column(unique=True)
  is_available: Mapped[bool] = mapped_column(default=True)
  num_tickets: Mapped[int] = mapped_column(default=100)