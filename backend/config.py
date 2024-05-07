import os

from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer

load_dotenv()

# API configuration settings
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

