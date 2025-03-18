function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    if (userInput.value.trim() === "") return;

    // Create user message
    const userMessage = document.createElement("div");
    userMessage.textContent = userInput.value;
    userMessage.style.textAlign = "right";
    chatBox.appendChild(userMessage);

    const messageText = userInput.value;
    userInput.value = "";

    // Send user message to Rasa backend
    fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText, sender: "user" })
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(msg => {
            const botMessage = document.createElement("div");
            botMessage.textContent = msg.text;
            botMessage.style.textAlign = "left";
            chatBox.appendChild(botMessage);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Error: Could not reach the server.";
        errorMessage.style.textAlign = "left";
        chatBox.appendChild(errorMessage);
    });
}
