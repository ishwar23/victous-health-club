const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// Get All Orders for User
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

module.exports = router;
