import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/coursesController.js";

const coursesRouter = express.Router({ mergeParams: true });

coursesRouter.route("/").get(index).post(store);
coursesRouter.route("/:id").get(show).put(update).delete(destroy);

export default coursesRouter;
