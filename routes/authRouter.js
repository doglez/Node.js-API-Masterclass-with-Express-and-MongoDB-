import express from "express";
import {
  forgotPassword,
  getMe,
  login,
  register,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getMe);
authRouter.post("/forgotpassword", forgotPassword);
authRouter.put("/resetpassword/:resettoken", resetPassword);

export default authRouter;
