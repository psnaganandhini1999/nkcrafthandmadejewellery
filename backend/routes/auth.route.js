const express = require('express');
const router = express.Router();

const { MODULE, TOKEN_OPTIONS } = require("../lib/helper.lib");
const controller = require('../controller/auth.controller');
const { protect } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/input.middleware");

router.post("/create-account", validate(MODULE.USER_CREATE_ACCOUNT), controller.register);
router.post("/login", validate(MODULE.USER_LOGIN), controller.login);
router.post("/request-email", validate(MODULE.USER_FORGET_PASSWORD), controller.forgetPassword);
router.post("/update-password", protect(TOKEN_OPTIONS.TEMP), validate(MODULE.USER_RESET_PASSWORD), controller.resetPassword);

module.exports = router;