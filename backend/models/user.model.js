const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive', 'Deleted'], default: 'Active' },
}, { timestamps: true });

const LogHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    ipAddress: { type: String, required: true },
    browser: { type: String, required: true },
    device: { type: String, enum: ["desktop", "tablet", "mobile", "smart-tv", "bot"], default: "mobile"},
    deviceType: { type: String, default: "mobile"},
    os: { type: String, required: true },
    userAgent: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    activityType: { type: String, required: true },
    activityDetails: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = {
    User: mongoose.model("User", UserSchema),
    UserLogHistory: mongoose.model("UserLogHistory", LogHistorySchema),
    UserActivity: mongoose.model("UserActivity", activitySchema),
};