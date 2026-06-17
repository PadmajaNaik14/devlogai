from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.schemas.user_schema import RegisterUser
from app.database.dependencies import get_db
from app.models.user import User
from app.services.auth_service import hash_password
from app.schemas.login_schema import LoginUser
from app.services.auth_service import verify_password
from app.services.jwt_service import create_access_token

router = APIRouter()

@router.get("/")
def test():
    return {
        "message": "Auth Route Working"
    }

@router.post("/register")
def register_user(
    user: RegisterUser,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        return {
            "message": "Email already registered"
        }

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "User Registered Successfully"
    }
@router.post("/login")
def login_user(
    user: LoginUser,
    db: Session = Depends(get_db)
):

    db_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not db_user:
        return {
            "message": "Invalid credentials"
        }

    valid = verify_password(
        user.password,
        db_user.password_hash
    )

    if not valid:
        return {
            "message": "Invalid credentials"
        }

    token = create_access_token(
        db_user.id
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }