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
  db_user = UserModel(email=user.email, hashed_password=hashed_password, full_name=user.full_name)

  db.add(db_user)
  db.commit()
  db.refresh(db_user)

  # Create a dictionary with the necessary fields
  user_dict = {key: value for key, value in db_user.__dict__.items() if key in ["email", "full_name", "id", "disabled", "flagged_for_deletion", "verified"]}
  return User(**user_dict)