from app.services.auth_service import (
    create_access_token,
    verify_token
)

token = create_access_token(
    {
        "user_id": 1
    }
)

print(token)

print(
    verify_token(token)
)