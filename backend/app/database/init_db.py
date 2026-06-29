from app.database.postgres import engine
from app.database.base import Base

from app.models.user import User
from app.models.journal import Journal
from app.models.login_activity import LoginActivity
from app.models.chat_message import ChatMessage

Base.metadata.create_all(bind=engine)

print("Tables Created")