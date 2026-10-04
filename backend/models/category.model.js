const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    catName: { type: String, required: true, unique: true, trim: true },
    catImg: { type: String, default: "" },
    catDes: { type: String, default: "" },
    catStatus: { type: String, default: true },
    slug: { type: String, required: true, unique: true, trim: true },
    tags: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
},{ timestamps: true });

module.exports = {
    Category: mongoose.model("Category", categorySchema)
};