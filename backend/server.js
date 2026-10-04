const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const http = require("http");
const useragent = require('express-useragent');
const restrictBots = require("./middleware/bot-detection.middleware");
const { rateLimit } = require("express-rate-limit");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

require("./lib/mongoose.lib")();

const app = express();
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
app.use(restrictBots({ allowSearchEngines: true }));
app.use(limiter);

// Routes
app.get("/", (req, res) => {
    res.send(req.useragent)
});
app.use("/api", require("./routes/index"));

// Handle 404 errors
app.use(function (req, res, next) {
    res.status(404).send("Error 404: Not Found");
});

// Error handling middleware
app.use(function (err, req, res, next) {
    res.status(500).send({
        status: false,
        message: err.message || "Something went wrong. Please try later"
    });
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running port is ${PORT}`)
});