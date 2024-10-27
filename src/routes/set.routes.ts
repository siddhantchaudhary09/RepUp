import { Router } from "express";
import { createSet, updateSet } from "../controllers/set.controller";

const router = Router();
router.route("/updateset").post(updateSet);

router.route("/createset").post(createSet);

export default router;
