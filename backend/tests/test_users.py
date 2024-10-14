def test_get_all_users(client):
  res = client.get("/api/v1/users")

  assert res.status_code == 200