from datetime import datetime, timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from api.users.services import create_user, read_all_users, update_user_type
from dependencies.db import get_db
from config import ACCESS_TOKEN_EXPIRE_MINUTES
from api.auth.dtos import Token
from api.users.dtos import StatusUpdateResponse, UserCreate, UserPublic
from api.auth.services import create_access_token, get_current_active_user

user_router = APIRouter(prefix="/api/v1/users", tags=["users"])

@user_router.get("/", response_model=list[UserPublic])
async def get_all_users(db: Session = Depends(get_db)) -> list[UserPublic]:
    """Gets all the users currently in the database

    Args:
        db: The database session to use to update the database tables
    
    Returns:
        list[UserModel]: A list of UserInDb objects
    """
    return read_all_users(db)

@user_router.post("/", response_model=Token)
async def create_new_user(new_user: UserCreate, db: Session = Depends(get_db)) -> Token:
    """Takes in a candidate user, validates it, adds to the database and returns an access token

    Args:
        new_user (User): The candidate user

    Returns:
        Token: An object containing the access token and the type of access token
    """
    try:
        validated_dob = datetime.strptime(new_user.dob, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The date is in the incorrect format. Please use the format YYYY-MM-DD")
    
    # 6570 days is exactly 18 years
    if ((datetime.now() - validated_dob).days < 6570):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You need to be 18 years of age to create an account")

    new_user_id = create_user(db, new_user)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": f"{new_user_id}"}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@user_router.get("/me", response_model=UserPublic)
async def read_users_me(current_user: Annotated[UserPublic, Depends(get_current_active_user)]):
    """Gets the current active user

    Args:
        current_user (UserPublic): This is the current user 

    Returns:
        UserPublic: The current authenticated and active user
    """
    return current_user


@user_router.put("/me/member-status", response_model=StatusUpdateResponse)
async def update_user_member_type(access_token: str, member: bool, db: Session = Depends(get_db)):
    current_user = get_current_active_user(db, access_token)
    if current_user.type == "member" and member:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You are already a member")
    
    if current_user.type == "free" and not member:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You are already a free user")
    
    updated_user = update_user_type(db, current_user, member)
    if updated_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return StatusUpdateResponse(msg="User status updated successfully")
