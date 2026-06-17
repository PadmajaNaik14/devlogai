from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.schemas.journal_schema import CreateJournal

from app.models.journal import Journal
from app.ai.rag import store_journal

router = APIRouter()

@router.get("/")
def get_journals(
    db: Session = Depends(get_db)
):

    journals = db.query(
        Journal
    ).all()

    return journals

@router.get("/{journal_id}")
def get_journal(
    journal_id:int,
    db: Session = Depends(get_db)
):

    journal = (
        db.query(Journal)
        .filter(
            Journal.id == journal_id
        )
        .first()
    )

    return journal

@router.put("/{journal_id}")
def update_journal(
    journal_id:int,
    journal:CreateJournal,
    db:Session=Depends(get_db)
):

    existing = (
        db.query(Journal)
        .filter(
            Journal.id == journal_id
        )
        .first()
    )

    existing.title = journal.title

    existing.content = journal.content

    db.commit()

    return {
        "message":"Updated"
    }

@router.post("/")
def create_journal(
    journal: CreateJournal,
    db: Session = Depends(get_db)
):

    new_journal = Journal(
        title=journal.title,
        content=journal.content,
        user_id=1
    )

    db.add(new_journal)

    db.commit()

    db.refresh(new_journal)

    store_journal(
        new_journal.id,
        new_journal.content
    )

    return {
      "message":"Journal Created"
    }

@router.delete("/{journal_id}")
def delete_journal(
    journal_id:int,
    db:Session=Depends(get_db)
):

    journal = (
        db.query(Journal)
        .filter(
            Journal.id == journal_id
        )
        .first()
    )

    db.delete(journal)

    db.commit()
    

    return {
        "message":"Deleted"
    }