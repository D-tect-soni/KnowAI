import os
from google import genai

MODEL = "gemini-3.6-flash"

SYSTEM_PROMPT = """
You are KnowAI, a Universal Knowledge Assistant.

The user can ask about anything:
people, inventions, technology, science, history, animals,
plants, objects, places, companies, products, software,
food, materials, concepts, vehicles, buildings and more.

Give clear, accurate and easy-to-understand answers.

When relevant, explain:
1. What is it?
2. Who developed, invented, discovered, created, or introduced it?
3. Where did it originate?
4. When was it developed?
5. Why was it created?
6. How does it work?
7. Types
8. Uses
9. History
10. Important facts

Rules:
- Never invent an inventor.
- If there is no single known inventor, clearly say so.
- If information is disputed, mention the uncertainty.
- Do not force irrelevant sections.
- Keep answers useful and easy to understand.
"""

def ask_ai(question):

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise Exception("GEMINI_API_KEY is not configured.")

    client = genai.Client(api_key=api_key)

    response = client.models.generate_content(
        model=MODEL,
        contents=question,
        config={
            "system_instruction": SYSTEM_PROMPT,
            "temperature": 0.3,
            "max_output_tokens": 1200
        }
    )

    return response.text