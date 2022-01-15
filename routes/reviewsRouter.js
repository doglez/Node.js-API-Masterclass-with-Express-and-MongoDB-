import express from "express";
import { index, show } from "../controllers/reviewsController.js";
import advancedResults from "../middleware/advancedResults.js";
import { authorize, protect } from "../middleware/auth.js";
import Review from "../models/Review.js";

const reviewsRouter = express.Router({ mergeParams: true });

reviewsRouter.route("/").get(
  advancedResults(Review, {
    path: "bootcamp",
    select: "name description",
  }),
  index
);
//   .post(protect, authorize("publisher", "admin"), store);
reviewsRouter.route("/:id").get(show);
//   .put(protect, authorize("publisher", "admin"), update)
//   .delete(protect, authorize("publisher", "admin"), destroy);

export default reviewsRouter;
