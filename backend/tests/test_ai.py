from .conftest import client
from .utils import get_token


def test_optimize_journal():

    token = get_token()

    response = client.post(

        "/ai/optimize",

        headers={

            "Authorization": f"Bearer {token}"

        },

        json={

            "content": "Today I implemented JWT authentication."

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert "optimized" in data

    assert len(data["optimized"]) > 0

def test_ai_chat():

    token = get_token()

    response = client.post(

        "/ai/chat",

        headers={

            "Authorization": f"Bearer {token}"

        },

        json={

            "question": "What did I work on?"

        }

    )

    assert response.status_code == 200

    data = response.json()

    assert "answer" in data

    assert len(data["answer"]) > 0

from .conftest import client
from .utils import get_token


def test_search():

    token = get_token()

    response = client.get(

        "/ai/search",

        params={

            "query": "jwt"

        },

        headers={

            "Authorization": f"Bearer {token}"

        }

    )

    assert response.status_code == 200