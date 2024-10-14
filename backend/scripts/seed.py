from datetime import datetime

from faker import Faker

from db.models.user import UserModel
from utils.auth import get_password_hash
from db.db import SessionLocal

fake = Faker()

def seed_users():
  users_data = []
  

  for i in range(0, 10):
    users_data.append(UserModel(name=fake.name(), email=fake.email(), password_hash=get_password_hash("testpass123"), dob=fake.date_of_birth(minimum_age=18), upcoming_bookings=fake.get_words_list(), date_created=datetime.now()))

  try:
    db = SessionLocal()

    db.add_all(users_data)
    db.commit()

    for user in users_data:
      db.refresh(user)

  finally:
    db.close()


