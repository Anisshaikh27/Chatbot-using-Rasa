import requests
import os
from dotenv import load_dotenv

load_dotenv()

def get_groq_response(user_query):
    url = "https://api.groq.com/openai/v1/chat/completions"  # Correct URL
    headers = {
        "Authorization": "Bearer " + os.getenv("GROQ_API_KEY"),
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3-8b-8192",
        "messages": [{"role": "user", "content": user_query}]
    }

    response = requests.post(url, json=data, headers=headers)
    print(response.status_code)
    print(response.json())
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return f"Error {response.status_code}: {response.text}"

# Example
print(get_groq_response("what is machine learning ?"))
