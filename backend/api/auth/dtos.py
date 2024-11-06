from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: str | None = None


class EmailVerificationResponse(BaseModel):
  email: str
  msg: str