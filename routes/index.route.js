const express = require("express");
const authCtrl = require("../controller/auth.controller");
const routeCtrl = require("../controller/route.controller");
const router = express.Router();

router.get("/corkboard", routeCtrl.getAllCorkboard);
router.get("/corkboard/byId", routeCtrl.getCorkboardById);

router.post("/corkboard", authCtrl.verifyToken, routeCtrl.corkBoard);
router.post("/login", routeCtrl.login);

module.exports = router;
