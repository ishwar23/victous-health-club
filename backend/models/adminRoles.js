const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Get All Admins
router.get("/admins", async (req, res) => {
    try {
        const admins = await User.find({ role: { $ne: "User" } });
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: "Error fetching admins" });
    }
});

// Update User Role
router.put("/update-role/:id", async (req, res) => {
    try {
        const { role } = req.body;
        if (!["Super Admin", "Support Admin", "Review Moderator"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        res.json({ message: "Role updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating role" });
    }
});

module.exports = router;
