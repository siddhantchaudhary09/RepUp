"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const set_controller_1 = require("../controllers/set.controller");
const router = (0, express_1.Router)();
router.route("/createset").post(set_controller_1.createSet);
exports.default = router;
