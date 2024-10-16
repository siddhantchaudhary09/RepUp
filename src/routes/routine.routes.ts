import { Router } from "express";
import {
  createRoutine,
  deleteroutine,
} from "../controllers/routine.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router = Router();

router.route("/createroutine").post(authMiddleware, createRoutine);
router.route("/deleteroutine/:id").delete(authMiddleware, deleteroutine);

export default router;
