const express = require("express");
const authCtrl = require("../controller/auth.controller");
const routeCtrl = require("../controller/route.controller");
const { sequelize } = require("../models");
const router = express.Router();

router.get("/corkboard", routeCtrl.getRecentCorkboard);
router.get("/corkboard/getAll", routeCtrl.getAllCorkboard);

router.post("/login", routeCtrl.login);
router.post("/corkboard", authCtrl.verifyToken, routeCtrl.corkBoard);
router.post("/corkboard/byId", routeCtrl.getCorkboardById);
router.post("/corkboard/get-corkboard-byUserId", routeCtrl.getCorkbyUserId);

router.post("/corkboard/user", routeCtrl.getUserById);
router.post("/add-pushpin", authCtrl.verifyToken, routeCtrl.postPushPin);
router.post("/corkboard/get-pushpin", routeCtrl.getPushPinByCorkboardId);
// router.post("/image-upload", );

module.exports = router;
