import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/coursesController.js";
import advancedResults from "../middleware/advancedResults.js";
import { authorize, protect } from "../middleware/auth.js";
import Course from "../models/Course.js";

const coursesRouter = express.Router({ mergeParams: true });

coursesRouter
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    index
  )
  .post(protect, authorize("publisher", "admin"), store);
coursesRouter
  .route("/:id")
  .get(show)
  .put(protect, authorize("publisher", "admin"), update)
  .delete(protect, authorize("publisher", "admin"), destroy);

export default coursesRouter;
