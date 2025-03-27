const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    console.log(`New Contact Message from ${name} - ${email}: ${message}`);

    res.json({ message: "Thank you for contacting us! We will get back to you soon." });
});

module.exports = router;
