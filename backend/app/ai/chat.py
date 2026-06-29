import google.generativeai as genai
import os

from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def chat_with_ai(
    question,
    context
):

    prompt = f"""
You are DevLog AI.

You are an AI assistant for software developers.

You have access to the user's previous journals.

If the question is related to the user's work, projects, progress, or journals,
use the journal context as your primary source.

If the question is a general programming or software engineering question
(for example "What is JWT?" or "Explain React Hooks"),
answer using your own knowledge.

If journal context is available, use it to personalize your answer.

Journal Context:

{context}

User Question:

{question}
"""

    response = model.generate_content(
        prompt
    )

    return response.text