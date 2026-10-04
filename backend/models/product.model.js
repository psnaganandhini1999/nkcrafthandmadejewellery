const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    pdtName: { 
      type: String, 
      required: true 
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    pdtDes: { 
      type: String, 
      required: true 
    },
    pdtDiscount: { 
      type: String, 
      default: 0 
    },
    pdtImages: {
      type: [String],
      default: [],
    },
    pdtTags: { 
      type: [String], 
      default: [] 
    },
    // isFeatured: { type: Boolean, default: false},
    pdtStatus: { 
      type: String, 
      enum: ["Active", "Deactive", "Deleted", "outOfStock"],
      default: true 
    },
    created_at: { 
      type: Date, 
      default: Date.now 
    },
    updated_at: {
      type: Date,
      default: Date.now
    },
  }, { timestamps: true });

const productVariantSchema = new mongoose.Schema(
  {
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product" 
    },
    size: { 
      type: String,
      required: true
    },
    price: { 
      type: String, 
      required: true 
    },
    stock: { 
      type: String,
      required: true
    },
    color: { 
      type: [String], 
      default: [] 
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }, { timestamps: true, _versionKey: false });

productSchema.index({ pdtName: 1, category: 1, pdtTags: 1 }, { unique: true });
productVariantSchema.index({ productId: 1, size: 1, color: 1 }, { unique: true });

module.exports = {
  Product: mongoose.model("Product", productSchema),
  ProductVariant: mongoose.model("ProductVariant", productVariantSchema)
};