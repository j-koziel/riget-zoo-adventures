from datetime import datetime

from sqlalchemy.orm import Session

from db.models.day import DayModel
from db.models.zoo_ticket import ZooTicketModel
from api.booking.dtos import DayCreate, ZooTicketCreate

def create_day(db: Session, day: DayCreate):
  new_day = DayModel(date=day.date, is_available=True)

  db.add(new_day)
  db.commit()
  db.refresh(new_day)


def create_zoo_ticket(db: Session, ticket: ZooTicketCreate):
  ticket_date = datetime.strptime(ticket.date, "%Y-%m-%d")
  day = db.query(DayModel).filter(DayModel.date == ticket_date).first()

  if not day:
    create_day(db, DayCreate(date=ticket_date, is_available=True))

  day_id = db.query(DayModel).filter(DayModel.date == ticket_date).first().id
  
  new_ticket = ZooTicketModel(day_id=day_id, user_id=ticket.user_id if ticket.user_id else None, num_guests=ticket.num_guests)
  db.add(new_ticket)
  db.commit()
  db.refresh(new_ticket)


def get_all_zoo_tickets(db: Session):
  return db.query(ZooTicketModel).all()