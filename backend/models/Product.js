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
    pdtDiscount: { type: String, default: 0},
    metaData: [{
      size: { type: String },
      price: { type: String, required: true },
      stock: { type: String },
    }],
    pdtImages: [{ type: String }],
    pdtColors: { type: String },
    pdtTags: [{ type: String }],
    // isFeatured: { type: Boolean, default: false},
    pdtStatus: { type: String, default: true},
  },{ timestamps: true});

module.exports = mongoose.model("Product", productSchema);