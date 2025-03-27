const mongoose = require("mongoose");

// Define Order Schema
const OrderSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true },
        }
    ],
    total: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    paymentMethod: {
        type: String,
        enum: ["Credit Card", "Debit Card", "UPI", "Cash on Delivery"],
        required: true,
    },
    transactionId: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
