# from datetime import timedelta
# from typing import Annotated

# from fastapi import APIRouter, Depends
# from fastapi.security import OAuth2PasswordRequestForm

# from config import ACCESS_TOKEN_EXPIRE_MINUTES
# from db.models.token import Token
# from utils.auth import authenticate_user, create_access_token

# router = APIRouter(prefix="/api/v1/auth", tags=["authentication"])

# @router.post("/token")
# async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
#     """Sends an access token if the user authenticates successfully

#     Args:
#         form_data (OAuth2PasswordRequestForm): The form data containing the user credentials

#     Returns:
#         Token: An object containing the access token and the token type
#     """
#     user = authenticate_user(form_data.username, form_data.password)

#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.id}, expires_delta=access_token_expires
#     )
#     return Token(access_token=access_token, token_type="bearer")