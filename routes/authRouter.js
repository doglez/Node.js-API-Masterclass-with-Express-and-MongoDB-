import express from "express";
import {
  forgotPassword,
  getMe,
  login,
  register,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getMe);
authRouter.post("/forgotpassword", forgotPassword);

export default authRouter;
