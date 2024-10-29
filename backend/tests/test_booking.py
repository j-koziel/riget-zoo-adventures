def test_book_zoo_ticket_as_guest(client):
  res = client.post("/api/v1/booking/zoo-tickets/book", json={"date": "2100-10-23", "num_guests": 5, "user_id": None})

  assert res.status_code == 200


def test_book_zoo_ticket_as_user(client, user):
  access_token = client.post("/api/v1/auth/token", data={"username": user.email, "password": "testpass123"}, headers={"Content-Type": "application/x-www-form-urlencoded"}).json()["access_token"]
  
  res = client.post("/api/v1/booking/zoo-tickets/book", json={"date": "2100-10-23", "num_guests": 5, "user_id": None}, headers={"Authorization": f"Bearer {access_token}"})

  assert res.status_code == 200