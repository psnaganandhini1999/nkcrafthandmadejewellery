const express = require("express");
const router = express.Router();

const { protect, protect1 } = require("../middleware/auth.middleware");
const { TOKEN_OPTIONS } = require("../lib/helper.lib");

router.use("/auth", require("./auth.route"));
router.use("/cart", protect(TOKEN_OPTIONS.USER), require("./cart.route"));
router.use("/order", protect(TOKEN_OPTIONS.USER), require("./order.route"));
router.use("/user", protect(TOKEN_OPTIONS.ADMIN), protect1, require("./user.route"));
router.use("/admin", protect(TOKEN_OPTIONS.ADMIN), protect1, require("./admin.route"));
router.use("/category", require("./category.route"));
router.use("/product", require("./product.route"));

module.exports = router;