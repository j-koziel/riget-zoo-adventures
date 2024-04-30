from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import user, auth, booking, article

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

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(booking.router)
app.include_router(article.router)