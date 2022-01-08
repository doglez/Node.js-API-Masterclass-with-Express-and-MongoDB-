import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/coursesController.js";
import advancedResults from "../middleware/advancedResults.js";
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
  .post(store);
coursesRouter.route("/:id").get(show).put(update).delete(destroy);

export default coursesRouter;
