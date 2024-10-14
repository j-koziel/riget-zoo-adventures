from sqlalchemy.orm import Session

from db.models.user import UserModel
from api.users.dtos import UserCreate, User
from config import pwd_context

def get_user(db: Session, user_id: int):
  return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> UserModel | None:
  user = db.query(UserModel).filter(UserModel.email == email).first()
  if user is None:
    return None

  return user


def read_all_users(db: Session, skip: int = 0, limit: int = 100):
  return db.query(UserModel).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate) -> User:
  hashed_password = pwd_context.hash(user.password)
  db_user = UserModel(email=user.email, password_hash=hashed_password, name=user.name, dob=user.dob)

  db.add(db_user)
  db.commit()
  db.refresh(db_user)

  # Create a dictionary with the required fields
  user_dict = {key: value for key, value in db_user.__dict__.items() if key in [
    "id",
    "disabled",
    "name",
    "email",
    "password_hash",
    "dob",
    "previous_bookings",
    "upcoming_bookings",
    "membership_duration",
    "next_payment_date"
]}
  return User(**user_dict)