async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        const token = "USER_FIREBASE_TOKEN"; // Replace with actual token
        fetch("http://localhost:5000/api/notifications/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, title: "🏋️ New Update!", body: "Check out our latest offers!" }),
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    requestNotificationPermission();
});
