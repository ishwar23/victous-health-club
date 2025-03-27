document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const orderData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        cart: JSON.parse(localStorage.getItem("cart")) || [],
    };

    fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Order Placed Successfully!");
            localStorage.removeItem("cart");
            window.location.href = "products.html";
        } else {
            alert("Payment Failed. Try Again.");
        }
    })
    .catch(error => console.error("Error:", error));
});
