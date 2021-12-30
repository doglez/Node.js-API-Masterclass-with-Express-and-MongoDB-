import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/bootcampsController.js";

const bootcampsRouter = express.Router();

bootcampsRouter.route("/").get(index).post(store);
bootcampsRouter.route("/:id").get(show).put(update).delete(destroy);

export default bootcampsRouter;
