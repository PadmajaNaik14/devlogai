from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.user import User
from app.models.chat_message import ChatMessage

from app.ai.rag import retrieve_context
from app.ai.chat import chat_with_ai
from app.ai.optimizer import optimize_journal

from app.schemas.ai_schema import OptimizeRequest
from app.schemas.chat_schema import (
    ChatRequest
)

from app.middleware.auth_middleware import (
    get_current_user
)

from fastapi import Request

from app.middleware.rate_limit import limiter

router = APIRouter()


@router.get("/")
def test():

    return {
        "message": "AI Route Working"
    }


@router.get("/search")
@limiter.limit("5/minute")
def search(

    request: Request,

    query: str,

    current_user=Depends(get_current_user)

):

    return retrieve_context(

        query,

        current_user["user_id"]

    )


@router.post("/optimize")
@limiter.limit("5/minute")
def optimize(

    request: Request,

    optimize_request: OptimizeRequest,

    current_user=Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)

):

    context = retrieve_context(

        optimize_request.content,

        current_user["user_id"]

    )

    documents = []

    if len(context["documents"]) > 0:

        documents = context["documents"][0]

    rag_context = "\n".join(documents)

    optimized = optimize_journal(

        optimize_request.content,

        rag_context

    )

    user = (

        db.query(User)

        .filter(

            User.id == current_user["user_id"]

        )

        .first()

    )

    if user:

        user.ai_optimizations += 1

        db.commit()

    return {

        "optimized": optimized

    }


@router.post("/chat")
@limiter.limit("5/minute")
def chat(
request: Request,

    chat_request: ChatRequest,

    current_user=Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)

):

    user_message = ChatMessage(

        user_id=current_user["user_id"],

        sender="user",

        message=chat_request.question

    )

    db.add(user_message)

    db.commit()

    context = retrieve_context(

        chat_request.question,

        current_user["user_id"]

    )

    documents = []

    if len(context["documents"]) > 0:

        documents = context["documents"][0]

    rag_context = "\n\n".join(documents)

    answer = chat_with_ai(

        chat_request.question,

        rag_context

    )

    ai_message = ChatMessage(

        user_id=current_user["user_id"],

        sender="ai",

        message=answer

    )

    db.add(ai_message)

    db.commit()

    return {

        "answer": answer

    }


@router.get("/chat/history")
def get_chat_history(

    current_user=Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)

):

    history = (

        db.query(ChatMessage)

        .filter(

            ChatMessage.user_id

            ==

            current_user["user_id"]

        )

        .order_by(

            ChatMessage.created_at.asc()

        )

        .all()

    )

    return history


@router.delete("/chat/history")
def clear_chat(

    current_user=Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)

):

    (

        db.query(ChatMessage)

        .filter(

            ChatMessage.user_id

            ==

            current_user["user_id"]

        )

        .delete()

    )

    db.commit()

    return {

        "message": "Chat Cleared"

    }