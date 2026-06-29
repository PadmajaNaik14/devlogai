from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.schemas.user_schema import RegisterUser
from app.database.dependencies import get_db
from app.models.user import User
from app.services.auth_service import hash_password
from app.schemas.login_schema import LoginUser
from app.models.login_activity import LoginActivity
from app.services.auth_service import verify_password
from fastapi import HTTPException
from app.services.jwt_service import create_access_token
from app.middleware.auth_middleware import (
    get_current_user
)

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

        raise HTTPException(
            status_code=401,
            detail="Email not found"
    )

    valid = verify_password(
        user.password,
        db_user.password_hash
    )

    if not valid:

        raise HTTPException(
            status_code=401,
            detail="Incorrect password"
    )

    token = create_access_token(
        db_user.id
    )
    activity = LoginActivity(
    user_id=db_user.id
)

    db.add(activity)
    db.commit()

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_me(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(
            User.id ==
            current_user["user_id"]
        )
        .first()
    )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }