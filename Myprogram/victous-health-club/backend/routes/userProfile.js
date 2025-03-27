const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Get User Profile
router.get("/profile/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile" });
    }
});

// Update User Profile
router.put("/profile/:id", async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, phone, address },
            { new: true }
        );
        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile" });
    }
});

// Get User Referral Code & Rewards
router.get("/referral/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ referralCode: user.referralCode, rewards: user.rewards });
    } catch (error) {
        res.status(500).json({ message: "Error fetching referral data" });
    }
});

// Redeem Rewards (Wallet System)
router.post("/redeem", async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.rewards < amount) {
            return res.status(400).json({ message: "Insufficient Rewards" });
        }

        user.rewards -= amount;
        await user.save();
        res.json({ message: "Rewards redeemed successfully", balance: user.rewards });
    } catch (error) {
        res.status(500).json({ message: "Error processing redemption" });
    }
});

module.exports = router;
