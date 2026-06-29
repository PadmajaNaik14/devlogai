from app.ai.embeddings import generate_embedding
from app.ai.vector_store import collection

def store_journal(
    journal_id,
    user_id,
    content
):

    embedding = generate_embedding(
        content
    )

    collection.add(
    ids=[str(journal_id)],
    embeddings=[embedding],
    documents=[content],
    metadatas=[
        {
            "user_id": user_id
        }
    ]
)

def retrieve_context(
    query,
    user_id
):

    embedding = generate_embedding(
        query
    )

    results = collection.query(
    query_embeddings=[embedding],
    n_results=3,
    where={
        "user_id": user_id
    }
)
    print(results)
    return results