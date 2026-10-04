const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
    },
    productVariantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "ProductVariant", 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Cart", cartSchema);