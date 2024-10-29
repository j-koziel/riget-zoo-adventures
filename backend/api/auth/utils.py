from jose import jwt

from config import ALGORITHM, SECRET_KEY

def decode_access_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])