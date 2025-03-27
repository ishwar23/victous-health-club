const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Static Files Serve करें (Frontend HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../frontend/src")));

// Import Routes
const contactRoutes = require("./routes/contact");
const bookingRoutes = require("./routes/booking");

app.use("/api/contact", contactRoutes);
app.use("/api/booking", bookingRoutes);

// ✅ Serve `index.html` for Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/src/pages/index.html"));
});

// ✅ Serve HTML Pages Properly
app.get("/:page", (req, res) => {
    const filePath = path.join(__dirname, `../frontend/src/pages/${req.params.page}`);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send("<h1 style='color: red;'>❌ Page Not Found!</h1>");
        }
    });
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
