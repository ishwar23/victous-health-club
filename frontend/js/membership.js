document.addEventListener("DOMContentLoaded", function () {
    console.log("Membership Page Loaded!");

    const userId = localStorage.getItem("userId");

    // Load Referral Link
    fetch(`http://localhost:5000/api/membership/referral/${userId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("referral-link").value = `http://localhost:3000/signup?ref=${data.referralCode}`;
        })
        .catch(error => console.error("Error fetching referral:", error));

    // Handle Membership Renewal
    document.getElementById("membership-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const membership = document.getElementById("membership").value;

        fetch("http://localhost:5000/api/membership/renew", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, membership }),
        })
        .then(response => response.json())
        .then(data => {
            alert("Membership Updated Successfully!");
        })
        .catch(error => console.error("Error updating membership:", error));
    });
});

// Copy Referral Link
function copyReferral() {
    const referralInput = document.getElementById("referral-link");
    referralInput.select();
    document.execCommand("copy");
    alert("Referral Link Copied!");
}
