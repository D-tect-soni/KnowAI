import ollama


MODEL = "qwen2.5:0.5b-instruct"


def ask_ai(question):

    prompt = f"""
You are KnowAI, a Universal Knowledge Assistant.

The user can ask about ANYTHING.

Examples:
- people
- inventions
- technology
- science
- history
- animals
- plants
- objects
- places
- companies
- products
- software
- food
- materials
- concepts
- vehicles
- buildings

User Question:
{question}

Give a clear and easy-to-understand answer.

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
- If information is disputed, mention it.
- Do not force irrelevant sections.
- Keep the answer simple and useful.
"""

    response = ollama.chat(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]