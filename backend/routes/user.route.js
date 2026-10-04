const express = require('express');
const router = express.Router();

const controller = require('../controller/user.controller');

router.get("/", controller.getUsersList)
router.get("/count", controller.getUserCount);
router.get("/detail/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.patch("/:id/:code", controller.changeStatus);
router.delete("/delete/:id", controller.deleteUser);

module.exports = router;