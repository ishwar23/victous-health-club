document.addEventListener("DOMContentLoaded", function () {
    console.log("Cart Page Loaded!");

    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        cartList.innerHTML = "";
        let total = 0;

        cart.forEach((product, index) => {
            total += product.price;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="../assets/products/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <h2>$${product.price}</h2>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartList.appendChild(cartItem);
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    };

    updateCartDisplay();
});
