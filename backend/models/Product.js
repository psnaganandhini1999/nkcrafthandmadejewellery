const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    pdtName: { type: String, required: true},
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    pdtDes: { type: String, required: true },
    pdtPrice: { type: String, required: true },
    pdtDiscount: { type: String, default: 0},
    pdtSku: { type: String, default: 0},
    pdtStock: { type: String, default: 0},
    pdtImages: [{ type: String }],
    pdtColors: { type: String },
    pdtSizes: [{ type: String }],
    pdtTags: [{ type: String }],
    // isFeatured: { type: Boolean, default: false},
    pdtStatus: { type: String, default: true},
  },{ timestamps: true});

module.exports = mongoose.model("Product", productSchema);