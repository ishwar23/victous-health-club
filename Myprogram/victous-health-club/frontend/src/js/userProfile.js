document.addEventListener("DOMContentLoaded", function () {
    console.log("User Profile Page Loaded!");

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Please log in first!");
        window.location.href = "login.html";
    }

    // Load User Profile
    function loadProfile() {
        fetch(`http://localhost:5000/api/user/profile/${userId}`)
            .then(response => response.json())
            .then(user => {
                document.getElementById("name").value = user.name;
                document.getElementById("email").value = user.email;
                document.getElementById("phone").value = user.phone;
                document.getElementById("address").value = user.address;
                document.getElementById("membership").innerText = user.membership;
                document.getElementById("expiry-date").innerText = user.membershipExpiry
                    ? new Date(user.membershipExpiry).toLocaleDateString()
                    : "N/A";
                document.getElementById("referral-code").innerText = user.referralCode;
                document.getElementById("rewards-balance").innerText = `$${user.rewards}`;
            })
            .catch(error => console.error("Error fetching profile:", error));
    }

    loadProfile();

    // Update User Profile
    document.getElementById("profile-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const profileData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
        };

        fetch(`http://localhost:5000/api/user/profile/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileData),
        })
        .then(response => response.json())
        .then(data => {
            alert("Profile Updated Successfully!");
        })
        .catch(error => console.error("Error updating profile:", error));
    });

    // Copy Referral Code
    document.getElementById("copy-referral").addEventListener("click", function () {
        const referralText = document.getElementById("referral-code").innerText;
        navigator.clipboard.writeText(`http://localhost:3000/signup?ref=${referralText}`);
        alert("Referral Link Copied!");
    });
});
