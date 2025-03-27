const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel");

// Assign Roles to Admins
router.post("/assign-role", async (req, res) => {
    const { email, role } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.role = role;
    await admin.save();

    res.json({ message: "Role Assigned Successfully!" });
});

module.exports = router;
