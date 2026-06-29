from fastapi import Request

from slowapi import Limiter

from app.services.jwt_service import (
    verify_token
)


def get_user_key(
    request: Request
):

    authorization = request.headers.get(
        "Authorization"
    )

    if not authorization:

        return request.client.host

    token = authorization.replace(
        "Bearer ",
        ""
    )

    payload = verify_token(
        token
    )

    if not payload:

        return request.client.host

    return str(
        payload["user_id"]
    )


limiter = Limiter(

    key_func=get_user_key

)