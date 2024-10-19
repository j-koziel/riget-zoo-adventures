from jose import jwt

from config import ALGORITHM, SECRET_KEY

def decode_access_token(token: str):
    print("This is the access token")
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])