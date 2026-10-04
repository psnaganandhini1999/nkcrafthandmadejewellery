const express = require('express');
const router = express.Router();

const controller = require('../controller/cart.controller');

router.post("/add", controller.addProductToCart);
router.get("/all", controller.getUserCartList);
router.put("/:userId/:productId", controller.updateCartItemQuantity);
router.delete("/remove/:cartId", controller.removeProductFromCart);
router.delete("/:userId", controller.clearUserCart);

module.exports = router;