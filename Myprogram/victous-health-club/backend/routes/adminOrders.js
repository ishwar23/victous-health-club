const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// Get All Orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

// Update Order Status
router.put("/update/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = req.body.status;
        await order.save();

        res.json({ message: "Order updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating order" });
    }
});

module.exports = router;
