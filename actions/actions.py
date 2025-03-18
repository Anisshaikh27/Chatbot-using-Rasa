# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from rasa_sdk import Action
from rasa_sdk.events import UserUtteranceReverted
import requests
import os 
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

class ActionHandleOutOfScope(Action):
    def name(self):
        return "action_handle_out_of_scope"

    def run(self, dispatcher, tracker, domain):
        user_message = tracker.latest_message.get("text")
        
        # API Request
        headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}
        data = {
            "model": "llama3-8b-8192",
            "messages": [{"role": "user", "content": user_message}]
        }

        try:
            response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=data)
            response_data = response.json()

            if response.status_code == 200:
                llm_reply = response.json()["choices"][0]["message"]["content"]
                # llm_reply = response_data.get("choices", [{}])[0].get("message", {}).get("content", "I'm not sure how to answer that.")
            else:
                llm_reply = f"API Error: {response_data.get('error', {}).get('message', 'Unknown error')}"
        
        except Exception as e:
            llm_reply = f"Error occurred: {str(e)}"

        dispatcher.utter_message(text=llm_reply)
        return [UserUtteranceReverted()]
