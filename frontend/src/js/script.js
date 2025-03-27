document.addEventListener("DOMContentLoaded", function () {
    console.log("🏅 Victous Health Club - Script Loaded!");

    /* ======= Smooth Scroll Navigation ======= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /* ======= Dark Mode Toggle ======= */
    const darkModeToggle = document.createElement("button");
    darkModeToggle.textContent = "🌙 Dark Mode";
    darkModeToggle.style.position = "fixed";
    darkModeToggle.style.bottom = "20px";
    darkModeToggle.style.right = "20px";
    darkModeToggle.style.padding = "10px";
    darkModeToggle.style.background = "#ff9900";
    darkModeToggle.style.color = "white";
    darkModeToggle.style.border = "none";
    darkModeToggle.style.cursor = "pointer";
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });

    /* ======= Scroll Animations ======= */
    const elements = document.querySelectorAll(".fade-in, .slide-in");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(element => {
        observer.observe(element);
    });

    /* ======= Live Chat Toggle ======= */
    window.toggleChat = function () {
        const chatBox = document.querySelector(".chat-box");
        chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
    };

    /* ======= Push Notifications ======= */
    function showNotification(message) {
        const notificationBox = document.getElementById("notification-box");
        const notificationMessage = document.getElementById("notification-message");
        
        notificationMessage.textContent = message;
        notificationBox.classList.remove("hidden");
    }

    window.closeNotification = function () {
        document.getElementById("notification-box").classList.add("hidden");
    };

    /* Simulate Notification on Load */
    setTimeout(() => {
        showNotification("🎉 Welcome to Victous Health Club! Join now for exclusive benefits.");
    }, 5000);
});
