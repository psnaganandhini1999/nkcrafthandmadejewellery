const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model("AdminUser", AdminUserSchema);