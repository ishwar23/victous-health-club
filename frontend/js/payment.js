function makePayment(amount) {
    fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Payment Successful! Welcome to Victous Health Club.");
        } else {
            alert("Payment Failed. Please try again.");
        }
    })
    .catch(error => console.error("Error:", error));
}
