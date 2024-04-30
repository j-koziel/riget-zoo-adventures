from datetime import datetime, timedelta
from typing import Annotated
import os

from fastapi import APIRouter, Depends, HTTPException, status

from config import ACCESS_TOKEN_EXPIRE_MINUTES
from db.models.user import User, UserInDb
from db.models.token import Token
from utils.auth import create_access_token, get_password_hash, get_user
from utils.db import read_db, write_db
from utils.user import get_current_active_user

router = APIRouter(prefix="/api/v1/users", tags=["users"])

@router.get("/")
async def get_all_users() -> UserInDb:
    """Gets all the users currently in the database

    Args:
        None
    
    Returns:
        list[UserInDb]: A list of UserInDb objects
    """
    users_db = read_db(f"{os.getcwd()}/db/users.json", UserInDb)
    return users_db

@router.post("/", response_model=Token)
async def create_new_user(new_user: User) -> Token:
    """Takes in a candidate user, validates it, adds to the database and returns an access token

    Args:
        new_user (User): The candidate user

    Returns:
        Token: An object containing the access token and the type of access token
    """
    users_db = read_db(f"{os.getcwd()}/db/users.json", UserInDb)
    for user in users_db:
        if new_user.email == user.email:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This user already exists")
        
    if len(new_user.password) < 8:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Your password is too short")
    
    if (new_user.password != new_user.password_confirm):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Your passwords need to match")
    
    try:
        validated_dob = datetime.strptime(new_user.dob, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The date is in the incorrect format. Please use the format YYYY-MM-DD")
    
    # 6570 days is exactly 18 years
    if ((datetime.now() - validated_dob).days < 6570):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You need to be 18 years of age to create an account")

    user_dict = dict(new_user)

    hashed_password = get_password_hash(user_dict["password"])

    user_dict["password_hash"] = hashed_password

    del user_dict["password"]
    del user_dict["password_confirm"]

    valid_user = UserInDb(**user_dict)

    users_db.append(valid_user)

    write_db(f"{os.getcwd()}/db/users.json", users_db)


    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": new_user.id}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.get("/me", response_model=User)
async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]) -> User:
    """Gets the current active user

    Args:
        current_user (User): This is the current user 

    Returns:
        User: The current authenticated and active user

    """
    return current_user

@router.put("/me/member-status")
async def update_user_status(current_user: Annotated[User, Depends(get_current_active_user)], member: bool):
    users_db = read_db(f"{os.getcwd()}/db/users.json", UserInDb)
    
    for user in users_db:
        if user.id == current_user.id and member:
            user.type = "member"
            write_db(f"{os.getcwd()}/db/users.json", users_db)
            return {"msg": "You are now a member"}
        
        if user.id == current_user.id and not member:
            user.type = "free"
            write_db(f"{os.getcwd()}/db/users.json", users_db)
            return {"msg": "You are no longer a member"}

