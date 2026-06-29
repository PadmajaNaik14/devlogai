from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user import User
from app.models.journal import Journal
from app.models.login_activity import LoginActivity

from datetime import datetime
from collections import defaultdict
from datetime import timedelta
from app.middleware.auth_middleware import (
    get_current_user
)
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
    current_user=Depends(get_current_user),
    db:Session=Depends(get_db)
):

    journals = (
    db.query(Journal)
    .filter(
        Journal.user_id ==
        current_user["user_id"]
    )
    .all()
)

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
    current_user=Depends(get_current_user),
    db:Session=Depends(get_db)
):

    journals = (
    db.query(Journal)
    .filter(
        Journal.user_id ==
        current_user["user_id"]
    )
    .all()
)

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
    current_user=Depends(get_current_user),
    db:Session=Depends(get_db)
):

    count = (
    db.query(Journal)
    .filter(
        Journal.user_id ==
        current_user["user_id"]
    )
    .count()
)

    return {
        "total_journals":count
    }

@router.get("/monthly-count")
def monthly_count(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    journals = (
        db.query(Journal)
        .filter(
            Journal.user_id ==
            current_user["user_id"]
        )
        .all()
    )

    months = {
        "Jan": 0,
        "Feb": 0,
        "Mar": 0,
        "Apr": 0,
        "May": 0,
        "Jun": 0,
        "Jul": 0,
        "Aug": 0,
        "Sep": 0,
        "Oct": 0,
        "Nov": 0,
        "Dec": 0
    }

    month_names = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    }

    for journal in journals:

        month_name = month_names[
            journal.created_at.month
        ]

        months[month_name] += 1

    return [
        {
            "month": key,
            "journals": value
        }
        for key, value
        in months.items()
    ]

@router.get("/streak")
def current_streak(
    current_user=Depends(get_current_user),
    db:Session=Depends(get_db)
):

    journals = (
    db.query(Journal)
    .filter(
        Journal.user_id ==
        current_user["user_id"]
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
    current_user=Depends(get_current_user),
    db:Session=Depends(get_db)
):

    journals = (
    db.query(Journal)
    .filter(
        Journal.user_id ==
        current_user["user_id"]
    )
    .all()
)

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
    current_user=Depends(get_current_user),
    db:Session=Depends(get_db)
):

    journals = (
    db.query(Journal)
    .filter(
        Journal.user_id ==
        current_user["user_id"]
    )
    .all()
)

    result = {}

    for journal in journals:

        date = str(
            journal.created_at.date()
        )

        if date not in result:

            result[date] = 0

        result[date] += 1

    return result

@router.get("/activity-calendar")
def activity_calendar(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    journals = (
        db.query(Journal)
        .filter(
            Journal.user_id ==
            current_user["user_id"]
        )
        .all()
    )

    logins = (
        db.query(LoginActivity)
        .filter(
            LoginActivity.user_id ==
            current_user["user_id"]
        )
        .all()
    )

    journal_days = list(
        set(
            str(
                journal.created_at.date()
            )
            for journal in journals
        )
    )

    login_days = list(
        set(
            str(
                login.login_date.date()
            )
            for login in logins
        )
    )

    return {
        "journal_days": journal_days,
        "login_days": login_days
    }

@router.get("/dashboard")
def dashboard(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    total = (
    db.query(Journal)
    .filter(
        Journal.user_id ==
        current_user["user_id"]
    )
    .count()
)

    current = current_streak(
    current_user,
    db
    )["streak"]

    longest = longest_streak(
    current_user,
    db
    )["longest_streak"]
    
    user = (
    db.query(User)
    .filter(
        User.id ==
        current_user["user_id"]
    )
    .first()
)

    ai_count = 0

    ai_count = 0

    if user:
        ai_count = (
            user.ai_optimizations
    )

    return {
        "total_journals": total,
        "current_streak": current,
        "longest_streak": longest,
        "ai_optimizations": ai_count
    }