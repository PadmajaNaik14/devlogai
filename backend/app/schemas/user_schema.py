from pydantic import BaseModel, EmailStr

class RegisterUser(BaseModel):
    name: str
    email: EmailStr
    password: str

print("RegisterUser Loaded")