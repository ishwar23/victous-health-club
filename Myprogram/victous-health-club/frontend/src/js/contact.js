document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseMessage").textContent = data.message;
    })
    .catch(error => console.error("Error:", error));
});
