const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: mongoose.Types.ObjectId, required: true, ref:"RoleMapping" },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "deactive", "deleted"], default: "active" },
}, { timestamps: true });
AdminUserSchema.index({ firstname: 1, lastname: 1, email: 1, role: 1 });

const roleAccessSchema = new mongoose.Schema({
    rolename: { type: String, required: true, unique: true },
    read: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
}, { timestamps: true });

const logHistorySchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser", required: true },
    ipAddress: { type: String, required: true },
    browser: { type: String, required: true },
    device: { type: String, enum: ["Desktop", "Tablet", "Mobile"], default: "Mobile"},
    os: { type: String, required: true },
    userAgent: { type: String, required: true },
    location: { type: { type: String, enum: ["Point"], required: true }, coordinates: { type: [Number], required: true } }, 
    timestamp: { type: Date, default: Date.now },
});
logHistorySchema.index({ location: "2dsphere", timestamp: 1, adminId: 1, browser: 1, device: 1 });

const ActivitySchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser", required: true },
    activityType: { type: String, required: true },
    activityDetails: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
ActivitySchema.index({ timestamp: 1, adminId: 1 });

module.exports = {
    Admin: mongoose.model("AdminUser", AdminUserSchema),
    AdminLogHistory: mongoose.model("AdminLogHistory", logHistorySchema),
    AdminActivity: mongoose.model("AdminActivity", ActivitySchema),
    RoleMapping: mongoose.model("RoleMapping", roleAccessSchema)
};