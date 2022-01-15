import express from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/reviewsController.js";
import advancedResults from "../middleware/advancedResults.js";
import { authorize, protect } from "../middleware/auth.js";
import Review from "../models/Review.js";

const reviewsRouter = express.Router({ mergeParams: true });

reviewsRouter
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    index
  )
  .post(protect, authorize("admin", "user"), store);
reviewsRouter
  .route("/:id")
  .get(show)
  .put(protect, authorize("user", "admin"), update)
  .delete(protect, authorize("user", "admin"), destroy);

export default reviewsRouter;
