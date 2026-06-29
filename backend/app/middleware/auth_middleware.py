from fastapi import Header
from fastapi import HTTPException

from app.services.jwt_service import (
    verify_token
)

def get_current_user(
    authorization: str = Header(None)
):

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Missing token"
        )

    token = authorization.replace(
        "Bearer ",
        ""
    )

    payload = verify_token(
        token
    )


    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )
    print(payload)

    return payload