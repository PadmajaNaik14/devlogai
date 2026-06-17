from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from datetime import datetime

from app.database.base import Base

class Journal(Base):

    __tablename__ = "journals"

    id = Column(Integer, primary_key=True)

    title = Column(String)

    content = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )
