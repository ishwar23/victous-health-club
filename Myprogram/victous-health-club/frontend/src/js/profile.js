document.getElementById("profile-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const profileData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
    };

    fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
    })
    .then(response => response.json())
    .then(data => {
        alert("Profile Updated Successfully!");
    })
    .catch(error => console.error("Error:", error));
});
