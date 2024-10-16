import { Router } from "express";
import {
  createExcercise,
  deleteExcercise,
} from "../controllers/Excercise.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router = Router();

router.route("/createexcercise").post(authMiddleware, createExcercise);
router.route("/deleteexcercise").delete(authMiddleware, deleteExcercise);

export default router;
