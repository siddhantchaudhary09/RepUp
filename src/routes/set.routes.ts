import { Router } from "express";
import { createSet } from "../controllers/set.controller";

const router = Router();

router.route("/createset").post(createSet);

export default router;
