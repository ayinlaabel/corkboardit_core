const express = require("express");
const authCtrl = require("../controller/auth.controller");
const routeCtrl = require("../controller/route.controller");
const router = express.Router();

router.get("/corkboard", routeCtrl.getAllCorkboard);

router.post("/corkboard", authCtrl.verifyToken, routeCtrl.corkBoard);
router.post("/login", routeCtrl.login);

module.exports = router;
