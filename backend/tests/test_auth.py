from .conftest import client

import uuid


def test_register_and_login():

    email = f"{uuid.uuid4()}@gmail.com"

    password = "password123"

    # Register User

    register_response = client.post(

        "/auth/register",

        json={

            "name": "Test User",

            "email": email,

            "password": password

        }

    )

    assert register_response.status_code == 200

    # Login User

    login_response = client.post(

        "/auth/login",

        json={

            "email": email,

            "password": password

        }

    )

    assert login_response.status_code == 200

    data = login_response.json()

    assert "access_token" in data

    assert data["access_token"] != ""