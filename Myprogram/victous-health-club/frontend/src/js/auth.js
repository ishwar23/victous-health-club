document.getElementById("signup-form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Signup Successful!");
            window.location.href = "login.html";
        } else {
            alert("Signup Failed: " + data.message);
        }
    })
    .catch(error => console.error("Error:", error));
});

document.getElementById("login-form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const loginData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("Login Successful!");
            window.location.href = "orders.html";
        } else {
            alert("Login Failed: " + data.message);
        }
    })
    .catch(error => console.error("Error:", error));
});
