from pydantic import BaseModel
from datetime import datetime


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str


class ChatMessageResponse(BaseModel):
    sender: str
    message: str
    created_at: datetime