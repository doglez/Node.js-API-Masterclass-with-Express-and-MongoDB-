import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
  getBootcampsInRadius,
} from "../controllers/bootcampsController.js";

// Include other resource routers
import coursesRouter from "./coursesRouter.js";

const bootcampsRouter = express.Router();

bootcampsRouter.route("/").get(index).post(store);
bootcampsRouter.route("/:id").get(show).put(update).delete(destroy);
bootcampsRouter.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// Re-route into other resources
bootcampsRouter.use("/:bootcampId/courses", coursesRouter);

export default bootcampsRouter;
