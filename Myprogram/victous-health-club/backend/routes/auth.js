const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const users = []; // Temporary storage, replace with database

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);

    res.json({ success: true, message: "User registered successfully!" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "secretkey", { expiresIn: "1h" });
    res.json({ success: true, user: { name: user.name, email: user.email, token } });
});

module.exports = router;
