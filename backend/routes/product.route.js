const express = require('express');
const router = express.Router();

const { TOKEN_OPTIONS } = require('../lib/helper.lib');
const { protect, protect1, } = require('../middleware/auth.middleware');
const controller = require('../controller/product.controller');

router.get("/count", controller.getProductCount);
router.get("/", controller.getAllProducts);
router.get("/detail/:id", controller.getProductDetail);
router.post("/", protect(TOKEN_OPTIONS.ADMIN), protect1, controller.createProduct);
router.put("/:id", protect(TOKEN_OPTIONS.ADMIN), protect1, controller.updateProduct);
router.patch("/:id", protect(TOKEN_OPTIONS.ADMIN), protect1, controller.updateProduct)
router.delete("/delete/:id", protect(TOKEN_OPTIONS.ADMIN), protect1, controller.deleteProduct);

module.exports = router;