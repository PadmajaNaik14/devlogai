from app.services.jwt_service import (
    create_access_token,
    verify_token
)

token = create_access_token(1)

print(token)

print(
    verify_token(token)
)