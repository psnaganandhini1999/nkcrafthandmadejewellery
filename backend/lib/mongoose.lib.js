const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/nkcraft";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error("MongoDB Connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;