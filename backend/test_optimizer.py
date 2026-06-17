from app.ai.optimizer import optimize_journal

result = optimize_journal(
    """
    Today I implemented JWT authentication using FastAPI.
    I learned how access tokens work and connected it to PostgreSQL.
    """,
    ""
)

print(result)