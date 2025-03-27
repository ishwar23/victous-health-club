const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const { name, email, address, cart } = req.body;
    
    if (!name || !email || !address || cart.length === 0) {
        return res.status(400).json({ message: "All fields are required" });
    }

    console.log(`New Order: ${name} (${email}) - ${cart.length} items.`);
    res.json({ success: true, message: "Order placed successfully!" });
});

module.exports = router;
