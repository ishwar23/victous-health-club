document.addEventListener("DOMContentLoaded", function () {
    console.log("Product Page Loaded!");

    const productList = document.getElementById("product-list");
    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function addToCart(product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }

    function renderProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="../assets/products/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <h2 class="price">$${product.price}</h2>
                <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
            `;
            productList.appendChild(productCard);
        });
    }

    fetch("http://localhost:5000/api/products")
        .then(response => response.json())
        .then(products => renderProducts(products))
        .catch(error => console.error("Error fetching products:", error));

    updateCartCount();
});
