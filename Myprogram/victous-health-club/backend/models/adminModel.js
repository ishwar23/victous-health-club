const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define Admin Schema
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Super Admin", "Support Admin", "Review Moderator"],
        default: "Support Admin",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Hash Password Before Saving
AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare Password for Login
AdminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
