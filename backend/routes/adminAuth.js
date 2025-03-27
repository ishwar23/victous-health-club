const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Admin = require("../models/adminModel");

// Admin Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, "secretkey", { expiresIn: "1h" });
    res.json({ success: true, token });
});

module.exports = router;
