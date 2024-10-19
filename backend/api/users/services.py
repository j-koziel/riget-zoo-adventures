from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from api.auth.utils import decode_access_token
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
  if len(user.password) < 8:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Your password is too short")
    
  if (user.password != user.password_confirm):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Your passwords need to match")

  hashed_password = pwd_context.hash(user.password)
  db_user = UserModel(email=user.email, password_hash=hashed_password, name=user.name, dob=user.dob)

  db.add(db_user)
  db.commit()
  db.refresh(db_user)

  return db_user.id


def update_user_type(db: Session, current_user: UserModel, member: bool):
  if current_user:
    current_user.type = "member" if member else "free"
    db.commit()
    db.refresh(current_user)
    return current_user
  return None

