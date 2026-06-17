from fastapi import APIRouter
from app.ai.rag import retrieve_context
from fastapi import Depends
from app.schemas.ai_schema import OptimizeRequest
from app.ai.optimizer import optimize_journal
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.models.user import User
from app.middleware.auth_middleware import (
    get_current_user
)

router = APIRouter()

@router.get("/")
def test():
    return {
        "message": "AI Route Working"
    }
@router.get("/search")
def search(query: str):

    return retrieve_context(query)

@router.post("/optimize")
def optimize(
    request: OptimizeRequest,
    db: Session = Depends(get_db)
):

    context = retrieve_context(
        request.content
    )

    documents = []

    if len(context["documents"]) > 0:
        documents = context["documents"][0]

    rag_context = "\n".join(documents)

    optimized = optimize_journal(
        request.content,
        rag_context
    )
    user = (
    db.query(User)
    .order_by(User.id.desc())
    .first()
)

    if user:

     user.ai_optimizations += 1

     db.commit()

    return {
        "optimized": optimized
    }