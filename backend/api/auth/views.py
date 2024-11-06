from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from api.users.services import set_user_verified
from dependencies.db import get_db
from config import ACCESS_TOKEN_EXPIRE_MINUTES
from api.auth.dtos import EmailVerificationResponse, Token
from api.auth.services import authenticate_user, create_access_token, verify_email

auth_router = APIRouter(prefix="/api/v1/auth", tags=["authentication"])

@auth_router.post("/token")
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)) -> Token:
    """Sends an access token if the user authenticates successfully

    Args:
        form_data (OAuth2PasswordRequestForm): The form data containing the user credentials

    Returns:
        Token: An object containing the access token and the token type
    """
    user = authenticate_user(form_data.username, form_data.password, db)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": f"{user.id}"}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@auth_router.get("/verify-email")
async def very_email_with_access_token(token: str, db: Session = Depends(get_db)):
  email = verify_email(token)

  set_user_verified(db=db, email=email, value=True)

  return EmailVerificationResponse(email=email, msg="Your email has been verified successfully")