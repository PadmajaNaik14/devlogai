from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user import User
from app.models.journal import Journal

from datetime import datetime
from collections import defaultdict
from datetime import timedelta
router = APIRouter()

@router.get("/")
def analytics_home():

    return {
        "message":"Analytics Route Working"
    }

@router.get("/month")
def get_month_journals(
    month:int,
    year:int,
    db:Session=Depends(get_db)
):

    journals = db.query(
        Journal
    ).all()

    result = []

    for journal in journals:

        if (
            journal.created_at.month == month
            and
            journal.created_at.year == year
        ):

            result.append(journal)

    return result

@router.get("/calendar")
def calendar_view(
    month:int,
    year:int,
    db:Session=Depends(get_db)
):

    journals = db.query(
        Journal
    ).all()

    days = []

    for journal in journals:

        if (
            journal.created_at.month == month
            and
            journal.created_at.year == year
        ):

            days.append(
                journal.created_at.day
            )

    return {
        "days":days
    }

@router.get("/total")
def total_journals(
    db:Session=Depends(get_db)
):

    count = db.query(
        Journal
    ).count()

    return {
        "total_journals":count
    }

@router.get("/monthly-count")
def monthly_count(
    db:Session=Depends(get_db)
):

    journals = db.query(
        Journal
    ).all()

    counts = defaultdict(int)

    for journal in journals:

        key = (
            f"{journal.created_at.year}-"
            f"{journal.created_at.month}"
        )

        counts[key] += 1

    return [
    {
        "month": key,
        "journals": value
    }
    for key, value in counts.items()
]

@router.get("/streak")
def current_streak(
    db:Session=Depends(get_db)
):

    journals = (
        db.query(Journal)
        .order_by(
            Journal.created_at.desc()
        )
        .all()
    )

    if not journals:
        return {
            "streak":0
        }

    dates = set()

    for journal in journals:

        dates.add(
            journal.created_at.date()
        )

    streak = 0

    current_day = datetime.utcnow().date()

    while current_day in dates:

        streak += 1

        current_day -= timedelta(days=1)

    return {
        "streak":streak
    }

@router.get("/longest-streak")
def longest_streak(
    db:Session=Depends(get_db)
):

    journals = db.query(
        Journal
    ).all()

    dates = sorted(
        list(
            set(
                j.created_at.date()
                for j in journals
            )
        )
    )

    longest = 0
    current = 1

    for i in range(
        1,
        len(dates)
    ):

        if (
            dates[i]
            ==
            dates[i-1]
            +
            timedelta(days=1)
        ):

            current += 1

            longest = max(
                longest,
                current
            )

        else:

            current = 1

    return {
        "longest_streak":longest
    }

@router.get("/heatmap")
def heatmap(
    db:Session=Depends(get_db)
):

    journals = db.query(
        Journal
    ).all()

    result = {}

    for journal in journals:

        date = str(
            journal.created_at.date()
        )

        if date not in result:

            result[date] = 0

        result[date] += 1

    return result

@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):

    total = db.query(
        Journal
    ).count()

    current = current_streak(
        db
    )["streak"]

    longest = longest_streak(
        db
    )["longest_streak"]
    latest_user = (
    db.query(User)
    .order_by(User.id.desc())
    .first()
    )

    ai_count = 0

    if latest_user:
        ai_count = (
         latest_user.ai_optimizations
        )

    return {
        "total_journals": total,
        "current_streak": current,
        "longest_streak": longest,
        "ai_optimizations": ai_count
    }