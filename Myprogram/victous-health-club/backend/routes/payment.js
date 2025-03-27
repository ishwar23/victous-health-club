const express = require("express");
const Stripe = require("stripe");
const Razorpay = require("razorpay");

const router = express.Router();

// 🔥 अपनी Stripe और Razorpay API Keys यहाँ डालें
const stripe = new Stripe("your-stripe-secret-key");
const razorpay = new Razorpay({
    key_id: "your-razorpay-key-id",
    key_secret: "your-razorpay-secret-key",
});

// 🔹 Common Function to Log Transactions
const logTransaction = (method, plan, amount, status) => {
    console.log(`[${new Date().toISOString()}] Payment Method: ${method}, Plan: ${plan}, Amount: ${amount}, Status: ${status}`);
};

// 🔹 Handle Stripe Payment
router.post("/stripe", async (req, res) => {
    const { plan, amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert dollars to cents
            currency: "usd",
        });

        logTransaction("Stripe", plan, amount, "Success");
        res.json({ success: true, clientSecret: paymentIntent.client_secret });
    } catch (error) {
        logTransaction("Stripe", plan, amount, "Failed");
        console.error("Stripe Payment Error:", error);
        res.status(500).json({ success: false, message: "Stripe Payment Failed" });
    }
});

// 🔹 Handle Razorpay Payment
router.post("/razorpay", async (req, res) => {
    const { plan, amount } = req.body;

    try {
        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `order_rcptid_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        logTransaction("Razorpay", plan, amount, "Success");

        res.json({ success: true, orderId: order.id });
    } catch (error) {
        logTransaction("Razorpay", plan, amount, "Failed");
        console.error("Razorpay Payment Error:", error);
        res.status(500).json({ success: false, message: "Razorpay Payment Failed" });
    }
});

module.exports = router;
