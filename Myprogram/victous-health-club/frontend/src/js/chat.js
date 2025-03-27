const socket = io("http://localhost:5000");

document.addEventListener("DOMContentLoaded", function () {
    console.log("💬 Live Chat Loaded!");

    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");

    function appendMessage(user, message) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chat-message");
        msgDiv.innerHTML = `<strong>${user}:</strong> ${message}`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    document.querySelector(".chat-footer button").addEventListener("click", function () {
        const message = chatInput.value.trim();
        if (message) {
            socket.emit("chatMessage", { user: "User", message });
            chatInput.value = "";
        }
    });

    socket.on("message", function (data) {
        appendMessage(data.user, data.message);
    });
});
