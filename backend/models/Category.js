const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    catName: { type: String, required: true, unique: true, trim: true },
    catImg: { type: String, default: "" },
    catDes: { type: String, default: "" },
    catStatus: { type: String, default: true },
},{ timestamps: true });

module.exports = mongoose.model("Category", categorySchema);