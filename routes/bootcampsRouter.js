import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
  getBootcampsInRadius,
  photoUpload,
} from "../controllers/bootcampsController.js";
import advancedResults from "../middleware/advancedResults.js";
import protect from "../middleware/auth.js";
import Bootcamp from "../models/Bootcamp.js";

// Include other resource routers
import coursesRouter from "./coursesRouter.js";

const bootcampsRouter = express.Router();

bootcampsRouter
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), index)
  .post(protect, store);
bootcampsRouter
  .route("/:id")
  .get(show)
  .put(protect, update)
  .delete(protect, destroy);
bootcampsRouter.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);
bootcampsRouter.route("/:id/photo").put(protect, photoUpload);

// Re-route into other resources
bootcampsRouter.use("/:bootcampId/courses", coursesRouter);

export default bootcampsRouter;
