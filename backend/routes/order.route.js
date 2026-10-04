const express = require('express');
const router = express.Router();

const controller = require('../controller/order.controller');

router.get("/count", controller.getOrderCount)
router.get("/", controller.getOrderList);
router.get("/detail/:id", controller.getOrderById);
router.post("/", controller.createOrder);

module.exports = router;