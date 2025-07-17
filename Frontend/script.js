function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    if (userInput.value.trim() === "") return;

    // Append User Message
    appendMessage(userInput.value, "user");

    const messageText = userInput.value;
    userInput.value = "";

    const API_URL = 'https://your-rasa-service.onrender.com/webhooks/rest/webhook';
    // Send user message to Rasa backend
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText, sender: "user" })
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(msg => appendMessage(msg.text, "bot"));
    })
    .catch(error => {
        console.error("Error:", error);
        appendMessage("Error: Could not reach the server.", "bot");
    });
}

// Function to append messages with avatars
function appendMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender === "user" ? "user-message" : "bot-message");

    // Random Avatar for Bot/User
    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = sender === "user"
        ? "https://randomuser.me/api/portraits/men/45.jpg" // User cartoon avatar
        : "../public/svg/chatbot.svg"; // Bot cartoon avatar


    const messageText = document.createElement("div");
    messageText.classList.add("message");
    messageText.textContent = text;

    // Append elements properly
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageText);
    chatBox.appendChild(messageDiv);

    // Scroll to bottom for new messages
    chatBox.scrollTop = chatBox.scrollHeight;
}
