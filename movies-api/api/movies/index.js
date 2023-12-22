import movieModel from "./movieModel";
import asyncHandler from "express-async-handler";
import express from "express";
import {
  getUpcomingMovies,
  getGenres,
  getMovieCredits,
  getActorDetails,
  getActorMovieCredits,
  getSimilarMovies,
  getTrendingMovies,
  getMoviesByKeyword,
  getMovie,
  getMovieImages,
  getActorImages,
  getMovies,
} from "../tmdb-api";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const movie = await getMovies(req.query.page);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({
        message: "The movie you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

// Get movie details
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({
        message: "The movie you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

// Get upcoming movies
router.get(
  "/upcoming/list",
  asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies(req.query.page);
    res.status(200).json(upcomingMovies);
    return res;
  })
);

// Get genres
router.get(
  "/genres/list",
  asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
    // return res;
  })
);

// Get credits by movie id
router.get(
  "/:id/credits",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const credits = await getMovieCredits(id);
    res.status(200).json(credits);
  })
);

// Get actor details
router.get(
  "/actor/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const actor = await getActorDetails(id);
    res.status(200).json(actor);
  })
);

// Get actor movie credits
router.get(
  "/actor/:id/movie_credits",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const actorMovieCredits = await getActorMovieCredits(id);
    res.status(200).json(actorMovieCredits);
  })
);

// Get similar movies by id
router.get(
  "/:id/similar",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const similarMovies = await getSimilarMovies(id);
    res.status(200).json(similarMovies);
  })
);

// Get trending movies
router.get(
  "/trending/:time_window",
  asyncHandler(async (req, res) => {
    const time_window = req.params.time_window;
    const trendingMovies = await getTrendingMovies(time_window);
    res.status(200).json(trendingMovies);
  })
);

// Get search results
router.get(
  "/search/:keyword",
  asyncHandler(async (req, res) => {
    const keyword = req.params.keyword;
    const results = await getMoviesByKeyword(keyword);
    res.status(200).json(results);
  })
);

// Get movie images
router.get(
  "/:id/images",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const results = await getMovieImages(id);
    res.status(200).json(results);
  })
);

// Get actor images
router.get(
  "/actor/:id/images",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const results = await getActorImages(id);
    res.status(200).json(results);
  })
);

export default router;
