document.addEventListener("DOMContentLoaded", function () {
    console.log("Admin Dashboard Loaded!");

    const orderList = document.getElementById("order-list");

    function loadOrders() {
        fetch("http://localhost:5000/api/admin/orders")
            .then(response => response.json())
            .then(orders => {
                orderList.innerHTML = "";
                orders.forEach(order => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${order._id}</td>
                        <td>${order.customer}</td>
                        <td>$${order.total}</td>
                        <td class="${order.status.toLowerCase()}">${order.status}</td>
                        <td>
                            <select onchange="updateOrderStatus('${order._id}', this.value)">
                                <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                                <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>
                                <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
                            </select>
                        </td>
                    `;
                    orderList.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching orders:", error));
    }

    window.updateOrderStatus = function (orderId, status) {
        fetch(`http://localhost:5000/api/admin/orders/update/${orderId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        })
        .then(() => {
            alert("Order Updated!");
            loadOrders();
        })
        .catch(error => console.error("Error updating order:", error));
    };

    loadOrders();
});
