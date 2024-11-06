def test_get_all_users(client):
  res = client.get("/api/v1/users")

  assert res.status_code == 200


def test_create_user(client):
  res = client.post("/api/v1/users", json={
    "email": "test@test.com",
    "password": "test1234",
    "password_confirm": "test1234",
    "name": "test",
    "dob": "2000-01-01"
  })

  assert res.status_code == 200


def test_create_user_short_password(client):
  res = client.post("/api/v1/users", json={
    "email": "test@test.com",
    "password": "test",
    "password_confirm": "test",
    "name": "test",
    "dob": "2000-01-01"
  })

  assert res.status_code == 400


def test_create_user_password_mismatch(client):
  res = client.post("/api/v1/users", json={
    "email": "test@test.com",
    "password": "test1234",
    "password_confirm": "test12345",
    "name": "test",
    "dob": "2000-01-01"
  })

  assert res.status_code == 400


def test_create_user_email_already_exists(client):
  res = client.post("/api/v1/users", json={
    "email": "test@test.com",
    "password": "test1234",
    "password_confirm": "test1234",
    "name": "test",
    "dob": "2000-01-01"
  })

  assert res.status_code == 400


def test_user_too_young(client):
  res = client.post("/api/v1/users", json={
    "email": "test@test.com",
    "password": "test1234",
    "password_confirm": "test1234",
    "name": "test",
    "dob": "2024-01-01"
  })

  assert res.status_code == 400


def test_get_current_active_user(client, user):
  access_token = client.post("/api/v1/auth/token", data={"username": user.email, "password": "testpass123"}, headers={"Content-Type": "application/x-www-form-urlencoded"}).json()["access_token"]
  
  res = client.get("/api/v1/users/me", headers={"Authorization": f"Bearer {access_token}"})

  assert res.status_code == 200

