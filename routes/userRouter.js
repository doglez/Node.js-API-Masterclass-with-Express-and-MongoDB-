import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/usersController.js";
import { authorize, protect } from "../middleware/auth.js";
import advancedResults from "../middleware/advancedResults.js";
import User from "../models/User.js";

const userRouter = express.Router();
userRouter.use(protect);
userRouter.use(authorize("admin"));

userRouter.route("/").get(advancedResults(User), index).post(store);
userRouter.route("/:id").get(show).put(update).delete(destroy);

export default userRouter;
