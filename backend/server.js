const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load Env Variables
dotenv.config();

// Connect Database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Static Files Serve करें (Frontend HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../frontend")));

// Import Routes
const contactRoutes = require("./routes/contact");
const bookingRoutes = require("./routes/booking");
const adminUsersRoutes = require("./routes/adminUsers");

app.use("/api/contact", contactRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/admin", adminUsersRoutes);

// ✅ Serve `index.html` for Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ✅ Serve HTML Pages Properly with Validation
app.get("/:page", (req, res) => {
    const allowedPages = ["about.html", "services.html", "contact.html"];
    const requestedPage = req.params.page;

    if (!allowedPages.includes(requestedPage)) {
        return res.status(404).send("<h1 style='color: red;'>❌ Page Not Found!</h1>");
    }

    const filePath = path.join(__dirname, `../frontend/pages/${requestedPage}`);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send("<h1 style='color: red;'>❌ Internal Server Error!</h1>");
        }
    });
});

// ✅ Handle Undefined Routes
app.use((req, res) => {
    res.status(404).send("<h1 style='color: red;'>❌ 404 - Route Not Found!</h1>");
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
