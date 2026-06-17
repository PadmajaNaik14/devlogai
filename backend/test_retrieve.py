from app.ai.rag import retrieve_context

results = retrieve_context(
    "docker"
)

print(results)