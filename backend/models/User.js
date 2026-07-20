const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    status: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);