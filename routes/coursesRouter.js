import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/coursesController.js";

const coursesRouter = express.Router({ mergeParams: true });

coursesRouter.route("/").get(index);

export default coursesRouter;
