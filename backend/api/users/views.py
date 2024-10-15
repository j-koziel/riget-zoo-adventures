from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from api.users.services import create_user, read_all_users
from dependencies.db import get_db
from config import ACCESS_TOKEN_EXPIRE_MINUTES
from api.auth.dtos import Token
from api.users.dtos import UserCreate
from utils.auth import create_access_token

user_router = APIRouter(prefix="/api/v1/users", tags=["users"])

@user_router.get("/")
async def get_all_users(db: Session = Depends(get_db)) -> list:
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

    created_user = create_user(db, new_user)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": created_user.id}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


# @user_router.get("/me", response_model=User)
# async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]) -> User:
#     """Gets the current active user

#     Args:
#         current_user (User): This is the current user 

#     Returns:
#         User: The current authenticated and active user

#     """
#     return current_user

# @user_router.put("/me/member-status")
# async def update_user_status(current_user: Annotated[User, Depends(get_current_active_user)], member: bool):
#     users_db = read_db(f"{os.getcwd()}/db/users.json", UserInDb)
    
#     for user in users_db:
#         if user.id == current_user.id and member:
#             user.type = "member"
#             write_db(f"{os.getcwd()}/db/users.json", users_db)
#             return {"msg": "You are now a member"}
        
#         if user.id == current_user.id and not member:
#             user.type = "free"
#             write_db(f"{os.getcwd()}/db/users.json", users_db)
#             return {"msg": "You are no longer a member"}