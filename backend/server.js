const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");
require("dotenv").config;
const Shippinddetails = require("./models/Orderdetails");
const Cart = require("./models/Cart");

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/user", require("./routes/user"));
app.use("/api/category", require("./routes/category"));
app.use("/api/product", require("./routes/product"));


// MongoDb Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/nkcraft", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.error("MongoDB Connection error:", err));

app.get("/", (req, res) => {
    res.send("Nk Craft Api is Running...")
});

server.listen(PORT, () => {
    console.log(`Server running port is ${PORT}`)
});