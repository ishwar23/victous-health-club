const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password"
    }
});

// Send Order Status Update Email
router.post("/email", async (req, res) => {
    const { email, status } = req.body;

    const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Order Status Update",
        text: `Your order status has been updated to: ${status}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email Sent Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email" });
    }
});

module.exports = router;
