from .conftest import client
from .utils import get_token
from datetime import datetime

def create_journal(token):

    client.post(

        "/journals/",

        headers={

            "Authorization": f"Bearer {token}"

        },

        json={

            "title": "Analytics",

            "content": "Testing analytics"

        }

    )

def test_dashboard():

    token = get_token()

    create_journal(token)

    response = client.get(

        "/analytics/dashboard",

        headers={

            "Authorization": f"Bearer {token}"

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert "total_journals" in data

def test_calendar():

    token = get_token()

    today = datetime.utcnow()

    response = client.get(

        "/analytics/calendar",

        params={

            "month": today.month,

            "year": today.year

        },

        headers={

            "Authorization": f"Bearer {token}"

        }

    )

    assert response.status_code == 200

    assert "days" in response.json()

def test_month():

    token = get_token()

    today = datetime.utcnow()

    response = client.get(

        "/analytics/month",

        params={

            "month": today.month,

            "year": today.year

        },

        headers={

            "Authorization": f"Bearer {token}"

        }

    )

    assert response.status_code == 200

def test_streak():

    token = get_token()

    response = client.get(

        "/analytics/streak",

        headers={

            "Authorization": f"Bearer {token}"

        }

    )

    assert response.status_code == 200

