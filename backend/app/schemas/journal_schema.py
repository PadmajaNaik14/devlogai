from pydantic import BaseModel

class CreateJournal(BaseModel):

    title: str

    content: str