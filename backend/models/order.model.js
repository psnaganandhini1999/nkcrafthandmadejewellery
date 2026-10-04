const mongoose = require("mongoose");

const OrderDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    items: [{
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
        price: { 
            type: Number, 
            required: true 
        }
    }],
    totalAmount: { type: Number, required: true },
    billingAddress: { 
        billingName: { type: String, required: true },
        billingPhone: { type: String, required: true },
        billingEmail: { type: String, required: true },
        billingAddressLineOne: { type: String, required: true },
        billingAddressLineTwo: { type: String, required: false },
        billingCity: { type: String, required: true },
        billingState: { type: String, required: true },
        billingCountry: { type: String, required: true },
        billingZipCode: { type: String, required: true }
    },
    shippingAddress: { 
        shippingName: { type: String, required: true },
        shippingPhone: { type: String, required: true },
        shippingEmail: { type: String, required: true },
        shippingAddressLineOne: { type: String, required: true },
        shippingAddressLineTwo: { type: String, required: false },
        shippingCity: { type: String, required: true },
        shippingState: { type: String, required: true },
        shippingCountry: { type: String, required: true },
        shippingLandmark: { type: [String], required: false, default: [] },
        shippingZipCode: { type: String, required: true }
    },
    paymentMethod: { 
        type: String, 
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'], 
        required: true 
    },
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Completed', 'Failed'], 
        default: 'Pending' 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Pending' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    orderNotes: { 
        type: String, 
        required: false
    },
    isGiftOrder: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true, versionKey: false });

OrderDetailsSchema.index({ userId: 1, status: 1, paymentStatus: 1, paymentMethod: 1, totalAmount: -1, createdAt: -1 });

module.exports = mongoose.model("OrderDetails", OrderDetailsSchema);