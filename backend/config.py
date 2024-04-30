import os

from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer

from db.models.user import UserInDb
from db.models.booking import Booking, HotelBooking
from db.models.zoo_ticket import ZooTicket
from utils.db import read_db

load_dotenv()

# API configuration settings
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

