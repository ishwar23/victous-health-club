const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define User Schema
const UserSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        default: "",
    },
    membership: {
        type: String,
        enum: ["Basic", "Premium", "VIP"],
        default: "Basic",
    },
    membershipExpiry: {
        type: Date,
        default: null,
    },
    referralCode: {
        type: String,
        unique: true,
    },
    referredBy: {
        type: String,
        default: null,
    },
    rewards: {
        type: Number,
        default: 0,
    },
    walletBalance: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Hash Password Before Saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare Password for Login
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate Unique Referral Code
UserSchema.pre("save", function (next) {
    if (!this.referralCode) {
        this.referralCode = Math.random().toString(36).substr(2, 8);
    }
    next();
});

// Redeem Rewards & Transfer to Wallet
UserSchema.methods.redeemRewards = function (amount) {
    if (this.rewards < amount) {
        throw new Error("Insufficient Rewards");
    }
    this.rewards -= amount;
    this.walletBalance += amount;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
