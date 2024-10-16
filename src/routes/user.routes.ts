import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import { registerExercise } from "../controllers/userexcercises.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

router.route("/create").post(authMiddleware, registerExercise);

export default router;
