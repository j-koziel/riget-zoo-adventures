from datetime import timedelta, datetime, timezone
from typing import Annotated

from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from api.auth.utils import decode_access_token
from config import ALGORITHM, SECRET_KEY, pwd_context
from db.models.user import UserModel
from api.users.services import get_user, get_user_by_email
from dependencies.db import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies that a password matches with the hashed version

    Args:
        plain_password (str): The password to be checked
        hashed_password (str): The hashed password which should match with the plain password

    Returns:
        bool: True for the password being verified and False for the password being incorrect
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def authenticate_user(email: str, password: str, db: Session) -> bool | UserModel:
    user = get_user_by_email(db, email=email)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="That user does not exist, please create an account")
    
    if not verify_password(password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Your email or password is incorrect")
    
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(access_token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
  credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
  try:
    user_id: str | None = decode_access_token(access_token)["sub"]
    print("This is the user id")
    print(user_id)

    if user_id is None:
      raise credentials_exception
  except JWTError as err:
    print(err)
    raise credentials_exception
  
  user = get_user(db, int(user_id))
  if user is None:
    print("No user???")
    raise credentials_exception
  
  return user

def get_current_active_user(current_user: Annotated[UserModel, Depends(get_current_user)]):
    if current_user.disabled:
       raise HTTPException(status_code=400, detail="This use is inactive")
    return current_user
