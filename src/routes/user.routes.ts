import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller";
import { registerExercise } from "../controllers/userexcercises.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

router.route("/create").post(authMiddleware, registerExercise);
router.route("/getcurrentuser").post(authMiddleware, getCurrentUser);

export default router;
