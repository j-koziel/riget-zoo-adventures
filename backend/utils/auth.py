import os
from fastapi import HTTPException, status

from datetime import timedelta, datetime, timezone

from passlib.context import CryptContext
from jose import jwt

from config import ALGORITHM, SECRET_KEY
from db.models.user import UserInDb
from utils.db import read_db


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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

def get_user(email: str = "", id: str = ""):
    users_db = read_db(f"{os.getcwd()}/db/users.json", UserInDb)
    for user in users_db:
        if email and user.email == email:
            return user
        if id and user.id == id:
            return user
    return False

def authenticate_user(email: str, password: str) -> bool | UserInDb:
    user = get_user(email=email)

    if not user:
        print("hello???")
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