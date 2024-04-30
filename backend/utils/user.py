import os
from typing import Annotated

from fastapi import Depends, HTTPException, status
from jose import jwt, JWTError

from config import oauth2_scheme, SECRET_KEY, ALGORITHM
from db.models.booking import Booking
from db.models.token import TokenData
from db.models.user import User, UserInDb
from utils.auth import get_user
from utils.db import read_db, write_db

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("sub")
        if id is None:
            raise credentials_exception
        token_data = TokenData(id=id)
    except JWTError:
        raise credentials_exception
    user = get_user(id=token_data.id)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: Annotated[User, Depends(get_current_user)]):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="This user is inactive")
    
    return current_user

def update_num_articles_read(user_id, users_db):
    for user in users_db:
        if user_id == user.id:
            user.num_articles_read = user.num_articles_read + 1
            write_db(f"{os.getcwd()}/db/users.json", users_db)

def update_user_bookings(booking_payload: Booking):
    users_db = read_db(f"{os.getcwd()}/db/users.json", UserInDb)
    user_to_update = get_user(id=booking_payload.user_id)
    user_to_update.upcoming_bookings.append(booking_payload)
    user_to_update.zoo_visits = len(user_to_update.upcoming_bookings)

    if user_to_update.type == "member":
        user_to_update.points = user_to_update.points + int(booking_payload.total_cost)
        for i, user in enumerate(users_db):
            if user.id == user_to_update.id:
                users_db[i] = user_to_update
                write_db(f"{os.getcwd()}/db/users.json", users_db)
                return booking_payload
            
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That user was not found. Are you logged in?")
    
    if user_to_update.type == "free":
        for i, user in enumerate(users_db):
            if user.id == user_to_update.id:
                users_db[i] = user_to_update
                write_db(f"{os.getcwd()}/db/users.json", users_db)
                return booking_payload
