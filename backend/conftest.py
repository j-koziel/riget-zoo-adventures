import pytest
from fastapi.testclient import TestClient

from app import app
from db.models.user import UserModel
from scripts.seed import seed_users
from db.db import Base, engine, SessionLocal


@pytest.fixture(scope="session")
def client():
  Base.metadata.create_all(bind=engine)

  try:
    seed_users()
    yield TestClient(app)
  finally:
    Base.metadata.drop_all(bind=engine)
    engine.dispose()

@pytest.fixture(scope="function")
def user():
  try:
    db = SessionLocal()
    db_user = db.query(UserModel).filter(UserModel.id == 1).first()

    if db_user == None:
      raise Exception("No user found???")
    
    yield db_user
  finally:
    db.close()