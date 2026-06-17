from app.database.postgres import engine
from app.database.base import Base

from app.models.user import User
from app.models.journal import Journal

Base.metadata.create_all(bind=engine)

print("Tables Created")