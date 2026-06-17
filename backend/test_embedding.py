from app.ai.embeddings import generate_embedding

result = generate_embedding(
    "Today I learned FastAPI"
)

print(len(result))