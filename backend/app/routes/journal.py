from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.journal_schema import CreateJournal

from app.models.journal import Journal

from app.ai.rag import store_journal

from app.middleware.auth_middleware import (
    get_current_user
)

router = APIRouter()


@router.get("/")
def get_journals(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    journals = (
        db.query(Journal)
        .filter(
            Journal.user_id ==
            current_user["user_id"]
        )
        .all()
    )

    return journals


@router.get("/{journal_id}")
def get_journal(
    journal_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    journal = (
        db.query(Journal)
        .filter(
            Journal.id == journal_id,
            Journal.user_id ==
            current_user["user_id"]
        )
        .first()
    )

    return journal


@router.post("/")
def create_journal(
    journal: CreateJournal,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_journal = Journal(
        title=journal.title,
        content=journal.content,
        user_id=current_user["user_id"]
    )

    db.add(new_journal)

    db.commit()

    db.refresh(new_journal)

    store_journal(
    new_journal.id,
    current_user["user_id"],
    new_journal.content
)

    return {
        "message": "Journal Created"
    }


@router.put("/{journal_id}")
def update_journal(
    journal_id: int,
    journal: CreateJournal,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    existing = (
        db.query(Journal)
        .filter(
            Journal.id == journal_id,
            Journal.user_id ==
            current_user["user_id"]
        )
        .first()
    )

    if not existing:
        return {
            "message": "Journal not found"
        }

    existing.title = journal.title
    existing.content = journal.content

    db.commit()

    return {
        "message": "Updated"
    }


@router.delete("/{journal_id}")
def delete_journal(
    journal_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    journal = (
        db.query(Journal)
        .filter(
            Journal.id == journal_id,
            Journal.user_id ==
            current_user["user_id"]
        )
        .first()
    )

    if not journal:
        return {
            "message": "Journal not found"
        }

    db.delete(journal)

    db.commit()

    return {
        "message": "Deleted"
    }