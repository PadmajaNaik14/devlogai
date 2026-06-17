from pydantic import BaseModel
from pydantic import EmailStr

class LoginUser(BaseModel):
    email: EmailStr
    password: str