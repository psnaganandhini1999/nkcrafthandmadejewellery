const router = require("express").Router();
const controller = require("../controller/admin.controller");

router.get("/count", controller.getAdminCount);
router.get("/detail/:id", controller.getAdminDetail);
router.get("/", controller.getAdminList);
router.post("/", controller.createAdmin);
router.put("/:id", controller.updateAdmin);
router.delete("/:id", controller.deleteAdmin);

module.exports = router;