document.addEventListener("DOMContentLoaded", function () {
    console.log("Orders Page Loaded!");

    const orderList = document.getElementById("order-list");

    function renderOrders(orders) {
        orderList.innerHTML = "";
        orders.forEach(order => {
            const orderCard = document.createElement("div");
            orderCard.classList.add("order-card");
            orderCard.innerHTML = `
                <h3>Order ID: ${order.id}</h3>
                <p>Items: ${order.items.length}</p>
                <p>Total: $${order.total}</p>
                <p class="order-status ${order.status.toLowerCase()}">Status: ${order.status}</p>
            `;
            orderList.appendChild(orderCard);
        });
    }

    fetch("http://localhost:5000/api/orders")
        .then(response => response.json())
        .then(orders => renderOrders(orders))
        .catch(error => console.error("Error fetching orders:", error));
});
