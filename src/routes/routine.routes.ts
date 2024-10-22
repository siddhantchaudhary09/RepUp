import { Router } from "express";
import {
  createRoutine,
  deleteroutine,
  routineInfo,
} from "../controllers/routine.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.route("/createroutine").post(authMiddleware, createRoutine);
router.route("/deleteroutine/:id").delete(authMiddleware, deleteroutine);
router.route("/getroutine").post(routineInfo);

export default router;
