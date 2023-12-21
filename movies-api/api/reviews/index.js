import reviewModel from "./reviewModel";
import asyncHandler from "express-async-handler";
import express from "express";
import Review from "./reviewModel";
import { getMovieReviews } from "../tmdb-api";
import dayjs from "dayjs";

const router = express.Router();

// Get reviews from tmdb
router.get(
  "/:id/tmdb",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const reviews = await getMovieReviews(id);
    res.status(200).json(reviews);
  })
);

// Get reviews from mongodb
router.get(
  "/:id/mongodb",
  asyncHandler(async (req, res) => {
    const reviews = await reviewModel.findAll();
    res.status(200).json(reviews);
  })
);

// Create new review
router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      if (!req.body.content) {
        return res
          .status(400)
          .json({ success: false, msg: "Content required." });
      } else {
        await createReview(req, res);
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, msg: "Internal server error." });
    }
  })
);

async function createReview(req, res) {
  req.body.author = req.user.username;
  req.body.author_details.username = req.user.username;
  req.body.movie_id = req.params.id;
  req.body.created_at = dayjs();
  req.body.updated_at = dayjs();
  await Review.create(req.body);
  res.status(201).json({ success: true, msg: "User successfully created." });
}

export default router;
