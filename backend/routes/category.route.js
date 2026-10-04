const express = require('express');
const router = express.Router();

const controller = require('../controller/category.controller');
const { protect, protect1 } = require("../middleware/auth.middleware");
const { uploadFile } = require("../middleware/upload.middleware");
const { TOKEN_OPTIONS } = require('../lib/helper.lib');

router.get("/count", controller.getCategoryCount);
router.get("/", controller.getCategoryList);
router.get("/detail/:id", controller.getCategoryDetail);
router.post("/", protect(TOKEN_OPTIONS.ADMIN), protect1, uploadFile, controller.createCategory);
router.put("/:id", protect(TOKEN_OPTIONS.ADMIN), protect1, uploadFile, controller.updateCategory);
router.patch("/:id", protect(TOKEN_OPTIONS.ADMIN), protect1, controller.updateCategory);
router.delete("/delete/:id", protect(TOKEN_OPTIONS.ADMIN), protect1, controller.deleteCategory);

module.exports = router;