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
  "/:id", // movie id
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

// Update a review by review id
router.put("/:_id", async (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }
  req.body.updated_at = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const result = await Review.updateOne(
    {
      _id: req.params._id,
    },
    req.body
  );
  if (result.matchedCount) {
    res.status(200).json({ code: 200, msg: "Review Updated Sucessfully" });
  } else {
    res.status(404).json({ code: 404, msg: "Unable to Update Review" });
  }
});

// Delete a review by review id
router.delete("/:_id", async (req, res) => {
  try {
    const result = await Review.deleteOne({ _id: req.params._id });

    if (result.deletedCount > 0) {
      res.status(200).json({ code: 200, msg: "Review Deleted Successfully" });
    } else {
      res.status(404).json({ code: 404, msg: "Review Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, msg: "Internal Server Error" });
  }
});

async function createReview(req, res) {
  req.body.author = req.user.username;
  req.body.author_details.username = req.user.username;
  req.body.movie_id = req.params.id;
  req.body.created_at = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  req.body.updated_at = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  await Review.create(req.body);
  res.status(201).json({ success: true, msg: "User successfully created." });
}

export default router;
