"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Excercise_controller_1 = require("../controllers/Excercise.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.route("/createexcercise").post(auth_middleware_1.authMiddleware, Excercise_controller_1.createExcercise);
router.route("/deleteexcercise").delete(auth_middleware_1.authMiddleware, Excercise_controller_1.deleteExcercise);
exports.default = router;
