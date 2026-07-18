const mongoose = require("mongoose");

const OrderDetailsSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    landmark: { type: String, required: false },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    orderNotes: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model("Orderdetails", OrderDetailsSchema);