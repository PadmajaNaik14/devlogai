from .conftest import client
import uuid


def get_token():

    email = f"{uuid.uuid4()}@gmail.com"

    password = "password123"

    client.post(

        "/auth/register",

        json={

            "name": "Test User",

            "email": email,

            "password": password

        }

    )

    response = client.post(

        "/auth/login",

        json={

            "email": email,

            "password": password

        }

    )

    token = response.json()["access_token"]

    return token