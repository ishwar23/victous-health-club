const express = require("express");
const router = express.Router();

// Dummy Product Data (Database Integration Required)
const products = [
    { id: 1, name: "Protein Powder", category: "supplements", price: 29.99, image: "protein.jpg", description: "High-quality whey protein." },
    { id: 2, name: "Dumbbells Set", category: "equipment", price: 49.99, image: "dumbbells.jpg", description: "Adjustable weight dumbbells." },
    { id: 3, name: "Gym T-shirt", category: "clothing", price: 19.99, image: "tshirt.jpg", description: "Breathable sportswear for workouts." },
];

// Get All Products
router.get("/", (req, res) => {
    res.json(products);
});

// Get Single Product by ID
router.get("/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    product ? res.json(product) : res.status(404).json({ message: "Product not found" });
});

module.exports = router;
