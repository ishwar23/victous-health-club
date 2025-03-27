document.addEventListener("DOMContentLoaded", function () {
    const reviewList = document.getElementById("reviews-list");

    function loadReviews() {
        fetch("http://localhost:5000/api/reviews")
            .then(response => response.json())
            .then(reviews => {
                reviewList.innerHTML = "";
                reviews.forEach(review => {
                    const div = document.createElement("div");
                    div.classList.add("review");
                    div.innerHTML = `<strong>${review.reviewer}:</strong> <p>${review.text}</p>`;
                    reviewList.appendChild(div);
                });
            })
            .catch(error => console.error("Error fetching reviews:", error));
    }

    document.getElementById("review-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const review = {
            reviewer: document.getElementById("reviewer").value,
            text: document.getElementById("review-text").value,
        };

        fetch("http://localhost:5000/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
        })
        .then(response => response.json())
        .then(data => {
            loadReviews();
            alert("Review Submitted Successfully!");
            document.getElementById("review-form").reset();
        })
        .catch(error => console.error("Error:", error));
    });

    loadReviews();
});
