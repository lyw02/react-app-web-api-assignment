import reviewModel from "./reviewModel";
import asyncHandler from "express-async-handler";
import express from "express";
import { getMovieReviews } from "../tmdb-api";

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

export default router;
