from app.ai.embeddings import generate_embedding
from app.ai.vector_store import collection

def store_journal(
    journal_id,
    content
):

    embedding = generate_embedding(
        content
    )

    collection.add(
        ids=[str(journal_id)],
        embeddings=[embedding],
        documents=[content]
    )

def retrieve_context(query):

    embedding = generate_embedding(
        query
    )

    results = collection.query(
        query_embeddings=[embedding],
        n_results=3
    )

    return results