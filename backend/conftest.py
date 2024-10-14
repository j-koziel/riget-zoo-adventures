import pytest
from fastapi.testclient import TestClient

from app import app
from scripts.seed import seed_users
from db.db import Base, engine


@pytest.fixture(scope="session")
def client():
  Base.metadata.create_all(bind=engine)

  try:
    seed_users()
    yield TestClient(app)
  finally:
    Base.metadata.drop_all(bind=engine)
    engine.dispose()