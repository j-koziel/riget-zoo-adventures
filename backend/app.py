from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

from api.users.views import user_router
from api.booking.views import booking_router
# from api.article.views import article_router
from api.auth.views import auth_router
from db.db import Base, engine

Base.metadata.create_all(engine)



app = FastAPI()

# These are the origins requests will be accepted from
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://riget-zoo-adventures.vercel.app"
]

# CORS middleware to ensure that the frontend can make requests to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(booking_router)
# app.include_router(article_router)
app.include_router(auth_router)
