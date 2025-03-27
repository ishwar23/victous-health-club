const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const { name, email, date, time } = req.body;

    if (!name || !email || !date || !time) {
        return res.status(400).json({ message: "All fields are required" });
    }

    console.log(`New Booking: ${name} booked a session on ${date} at ${time}`);

    res.json({ message: "Your session has been booked successfully!" });
});

module.exports = router;
