from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.journal import router as journal_router
from app.routes.analytics import router as analytics_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.ai import router as ai_router
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler
from fastapi.responses import JSONResponse
from app.middleware.rate_limit import limiter

app = FastAPI()

app.state.limiter = limiter

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://devlogai-six.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)
app.include_router(
    journal_router,
    prefix="/journals",
    tags=["Journals"]
)
@app.get("/")
def root():
    return {
        "message": "DevLog AI Backend Running"
    }
app.include_router(
    analytics_router,
    prefix="/analytics",
    tags=["Analytics"]
)
app.include_router(
    ai_router,
    prefix="/ai",
    tags=["AI"]
)

@app.exception_handler(
    RateLimitExceeded
)
async def rate_limit_handler(
    request,
    exc
):

    return JSONResponse(

        status_code=429,

        content={

            "detail":
            "AI request limit exceeded. Please wait a minute before trying again."

        }

    )