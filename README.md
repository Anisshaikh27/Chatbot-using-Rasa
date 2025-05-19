# 🤖 AI-Powered Chatbot: Design, Implementation, and Evaluation

This project demonstrates a **general-purpose AI chatbot** built using **RASA Open Source** with **LLM fallback** (via GROQ API). The chatbot can be accessed through a custom web interface built with **HTML, CSS, and JavaScript**.

---

## 🧠 Features

- Intent classification using RASA NLU
- Rule-based responses
- LLM fallback using GROQ's `llama3-8b` or `mixtral` models
- REST API integration
- Interactive frontend interface

---

## 🛠️ Tech Stack

| Component       | Technology              |
|----------------|--------------------------|
| NLP Engine      | RASA Open Source         |
| LLM Integration | GROQ API (LLaMA3/Mixtral)|
| Frontend        | HTML, CSS, JavaScript    |
| Deployment      | Localhost (Dev Environment) |

---

## ✅ Prerequisites

- Python 3.10
- Node.js (optional if using other frontend bundlers)
- Internet access (for GROQ API)
- [Live Server VS Code extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for frontend

---

## 🧱 Step 1: Create Virtual Environment

```bash
cd chatbot
python -m venv rasa_env
```

### 🟢 Activate Virtual Environment

```bash
# Windows
rasa_env\Scripts\activate

# Linux/Mac
source rasa_env/bin/activate
```

---

## 📦 Step 2: Install Dependencies

```bash
pip install rasa
pip install python-dotenv requests
```

---

## 🔑 Step 3: Set Up GROQ API Key

1. Create a `.env` file in the root directory.
2. Add your API key:

```
GROQ_API_KEY=your_actual_key_here
```

---

## 📁 Step 4: Project Structure

```
chatbot/
├── actions/
│   └── actions.py
├── data/
│   ├── nlu.yml
│   ├── rules.yml
├── domain.yml
├── config.yml
├── endpoints.yml
├── .env
├── models/
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
```

---

## 🧠 Step 5: Train the Chatbot Model

### 🔍 Validate Data

```bash
rasa data validate
```

### 🏋️ Train the Model

```bash
rasa train
```

This will create a new model in the `models/` directory.

---

## 🚀 Step 6: Run the Chatbot

> You need **two terminals**, both with the virtual environment activated.

### 🔁 Terminal 1: Start Action Server

```bash
rasa run actions
```

### 🧠 Terminal 2: Start RASA Server with API

```bash
rasa run --enable-api
```

Your backend is now running at `http://localhost:5005`.

---

## 🧪 Step 7: Testing and Evaluation

### 🧪 Automated Tests

```bash
rasa test
```

### 🧪 Run Custom Test Stories

```bash
rasa test core --stories tests/test_stories.yml
```

---

## 🌐 Step 8: Accessing Chatbot via Frontend

### 📂 Go to `frontend/` folder and open `index.html`

You can open this using:

- **Live Server Extension** (Recommended)
- OR using Python:

```bash
cd frontend
python -m http.server 8000
```

Then open: [http://localhost:8000](http://localhost:8000)

---

## 📡 Step 9: REST API Usage

### 🔁 Send Message to Chatbot

```http
POST http://localhost:5005/webhooks/rest/webhook
Content-Type: application/json

{
  "sender": "user",
  "message": "what is machine learning?"
}
```

### ✅ Expected Response

```json
[
  {
    "recipient_id": "user",
    "text": "Machine learning is a subfield of AI that enables systems to learn from data..."
  }
]
```

---

## 🔍 Evaluation Metrics (Optional)

If performance evaluation is part of your research:

- **Intent Accuracy** → Use RASA's built-in test metrics.
- **Latency** → Time API response using browser console or Postman.
- **User Feedback** → Conduct usability tests for response relevance.

---

## 📌 Future Improvements

- Add memory support (context tracking)
- Expand to multimodal input (voice, camera)
- Deploy on cloud (e.g., Azure, GCP, AWS)
- Use WebSockets for live messaging

---

## 🧾 References

- [RASA Docs](https://rasa.com/docs/)
- [GROQ Console](https://console.groq.com/)
- [REST API Guide](https://rasa.com/docs/rasa/pages/http-api)
- [Frontend Integration](https://rasa.com/docs/rasa/connectors/your-own-website)

---

> Built with ❤️ using RASA and GROQ API
