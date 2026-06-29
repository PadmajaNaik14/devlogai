import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def optimize_journal(content, context):

    prompt = f"""
Past Context:
{context}

Current Journal:
{content}

Convert this into:

1. Professional Summary
2. Key Achievements
3. LinkedIn Ready Post
"""
    print("========== GEMINI PROMPT ==========")
    print(prompt)
    print("===================================")

    response = model.generate_content(
        prompt
    )

    return response.text