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

/**
 * @swagger
 * /api/movies/:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get movies
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: page
 *        in: query
 *        description: movie data page
 *        required: false
 *        type: integer
 *        maximum: 500
 *        minimum: 1
 *        format: int32
 *      responses:
 *        200:
 *          description: success
 *          schema:
 *            ref: #/movieModel/MovieSchema
 *        404:
 *          description: The movie you requested could not be found.
 * */
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

/**
 * @swagger
 * /api/movies/{movieId}:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get movie details
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: movieId
 *        in: path
 *        description: movie id
 *        required: true
 *        type: integer
 *        minimum: 1
 *        format: int32
 *      responses:
 *        200:
 *          description: success
 *          schema:
 *            ref: #/movieModel/MovieSchema
 *        404:
 *          description: The movie you requested could not be found.
 * */
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

/**
 * @swagger
 * /api/movies/upcoming/list:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get movie details
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: page
 *        in: query
 *        description: movie data page
 *        required: true
 *        type: integer
 *        minimum: 1
 *        format: int32
 *      responses:
 *        200:
 *          description: success
 *          schema:
 *            ref: #/movieModel/MovieSchema
 * */
router.get(
  "/upcoming/list",
  asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies(req.query.page);
    res.status(200).json(upcomingMovies);
    return res;
  })
);

/**
 * @swagger
 * /api/movies/genres/list:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get genres
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: success
 * */
router.get(
  "/genres/list",
  asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
    // return res;
  })
);

/**
 * @swagger
 * /api/movies/{movieId}/credits:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get credits by movie id
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: movieId
 *        in: path
 *        description: movie id
 *        required: true
 *        type: integer
 *        minimum: 1
 *        format: int32
 *      responses:
 *        200:
 *          description: success
 * */
router.get(
  "/:id/credits",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const credits = await getMovieCredits(id);
    res.status(200).json(credits);
  })
);

/**
 * @swagger
 * /api/movies/actor/{actorId}:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get actor details
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: actorId
 *        in: path
 *        description: actor id
 *        required: true
 *        type: integer
 *        minimum: 1
 *        format: int32
 *      responses:
 *        200:
 *          description: success
 * */
router.get(
  "/actor/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const actor = await getActorDetails(id);
    res.status(200).json(actor);
  })
);

/**
 * @swagger
 * /api/movies/actor/{actorId}/movie_credits:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get actor movie credits
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: actorId
 *        in: path
 *        description: actor id
 *        required: true
 *        type: integer
 *        minimum: 1
 *        format: int32
 *      responses:
 *        200:
 *          description: success
 * */
router.get(
  "/actor/:id/movie_credits",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const actorMovieCredits = await getActorMovieCredits(id);
    res.status(200).json(actorMovieCredits);
  })
);

/**
 * @swagger
 * /api/movies/{movieId}/similar:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get similar movies by id
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: movieId
 *        in: path
 *        description: movie id
 *        required: true
 *        type: integer
 *        minimum: 1
 *        format: int32
 *      responses:
 *        200:
 *          description: success
 * */
router.get(
  "/:id/similar",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const similarMovies = await getSimilarMovies(id);
    res.status(200).json(similarMovies);
  })
);

/**
 * @swagger
 * /api/movies/trending/{timeWindow}:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get trending movies
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: timeWindow
 *        in: path
 *        description: movie id
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: success
 * */
router.get(
  "/trending/:time_window",
  asyncHandler(async (req, res) => {
    const time_window = req.params.time_window;
    const trendingMovies = await getTrendingMovies(time_window);
    res.status(200).json(trendingMovies);
  })
);

/**
 * @swagger
 * /api/movies/search/{keyword}:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get search results
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: keyword
 *        in: path
 *        description: search keyword
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: success
 * */
router.get(
  "/search/:keyword",
  asyncHandler(async (req, res) => {
    const keyword = req.params.keyword;
    const results = await getMoviesByKeyword(keyword);
    res.status(200).json(results);
  })
);

/**
 * @swagger
 * /api/movies/{movieId}/images:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get movie images
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: movieId
 *        in: path
 *        description: movie id
 *        required: true
 *        type: integer
 *        minimum: 1
 *        format: int32
 *      responses:
 *        200:
 *          description: success
 * */
router.get(
  "/:id/images",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const results = await getMovieImages(id);
    res.status(200).json(results);
  })
);

/**
 * @swagger
 * /api/movies/{actorId}/images:
 *    get:
 *      tags:
 *      - movies
 *      summary: Get actor images
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: actorId
 *        in: path
 *        description: actor id
 *        required: true
 *        type: integer
 *        minimum: 1
 *        format: int32
 *      responses:
 *        200:
 *          description: success
 * */
router.get(
  "/actor/:id/images",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const results = await getActorImages(id);
    res.status(200).json(results);
  })
);

export default router;
