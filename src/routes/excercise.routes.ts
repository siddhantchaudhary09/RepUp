import { Router } from "express";
import {
  createExcercise,
  deleteExcercise,
} from "../controllers/Excercise.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.route("/createexcercise").post(authMiddleware, createExcercise);
router.route("/deleteexcercise").delete(authMiddleware, deleteExcercise);

export default router;
