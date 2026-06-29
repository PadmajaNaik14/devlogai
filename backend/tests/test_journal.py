from .conftest import client
from .utils import get_token


def test_create_journal():

    token = get_token()

    response = client.post(

        "/journals/",

        headers={

            "Authorization": f"Bearer {token}"

        },

        json={

            "title": "Testing",

            "content": "This is my first API test."

        }

    )

    assert response.status_code == 200

    assert response.json()["message"] == "Journal Created"


def test_get_journals():

    token = get_token()

    client.post(

        "/journals/",

        headers={

            "Authorization": f"Bearer {token}"

        },

        json={

            "title": "Journal",

            "content": "Testing"

        }

    )

    response = client.get(

        "/journals/",

        headers={

            "Authorization": f"Bearer {token}"

        }

    )

    assert response.status_code == 200

    journals = response.json()

    assert len(journals) > 0

    assert journals[0]["title"] == "Journal"

def test_update_journal():

    token = get_token()

    create = client.post(

        "/journals/",

        headers={

            "Authorization": f"Bearer {token}"

        },

        json={

            "title": "Old",

            "content": "Old Content"

        }

    )

    journals = client.get(

        "/journals/",

        headers={

            "Authorization": f"Bearer {token}"

        }

    ).json()

    journal_id = journals[0]["id"]

    response = client.put(

        f"/journals/{journal_id}",

        headers={

            "Authorization": f"Bearer {token}"

        },

        json={

            "title": "New",

            "content": "Updated Content"

        }

    )

    assert response.status_code == 200

    assert response.json()["message"] == "Updated"

def test_delete_journal():

    token = get_token()

    client.post(

        "/journals/",

        headers={

            "Authorization": f"Bearer {token}"

        },

        json={

            "title": "Delete",

            "content": "Delete Me"

        }

    )

    journals = client.get(

        "/journals/",

        headers={

            "Authorization": f"Bearer {token}"

        }

    ).json()

    journal_id = journals[0]["id"]

    response = client.delete(

        f"/journals/{journal_id}",

        headers={

            "Authorization": f"Bearer {token}"

        }

    )

    assert response.status_code == 200

    assert response.json()["message"] == "Deleted"