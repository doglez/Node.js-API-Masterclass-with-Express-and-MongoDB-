import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/coursesController.js";
import advancedResults from "../middleware/advancedResults.js";
import protect from "../middleware/auth.js";
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
  .post(protect, store);
coursesRouter
  .route("/:id")
  .get(show)
  .put(protect, update)
  .delete(protect, destroy);

export default coursesRouter;
