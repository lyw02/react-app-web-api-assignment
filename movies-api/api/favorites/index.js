import favoriteModel from "./favoriteModel";
import Favorite from "./favoriteModel";
import asyncHandler from "express-async-handler";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /api/favorites/:
 *    get:
 *      tags:
 *      - favorites
 *      summary: Get all favorite movies
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: success
 *          schema:
 *            ref: #/favoriteModel/FavoriteSchema
 * */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting and getting favorite movies using favoriteModel
    const [total_results, results] = await Promise.all([
      favoriteModel.estimatedDocumentCount(),
      favoriteModel
        .find()
        .limit(limit)
        .skip((page - 1) * limit),
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page)

    //construct return Object and insert into response object
    const returnObject = {
      page,
      total_pages,
      total_results,
      results,
    };
    res.status(200).json(returnObject);
  })
);

/**
 * @swagger
 * /api/favorites/{movieId}:
 *    post:
 *      tags:
 *      - favorites
 *      summary: Add new favorite movie
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
 *        400:
 *          description: Movie id required.
 *        500:
 *          description: Error.
 * */
router.post(
  "/:id", // movie id
  asyncHandler(async (req, res) => {
    try {
      if (!req.params.id) {
        return res
          .status(400)
          .json({ success: false, msg: "Movie id required." });
      } else {
        await addFavorite(req, res);
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, msg: error });
    }
  })
);

/**
 * @swagger
 * /api/favorites/{movieId}:
 *    delete:
 *      tags:
 *      - favorites
 *      summary: Delete a movie from favorites
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
 *          description: Successfully Deleted From Favorites
 *          schema:
 *            ref: #/favoriteModel/FavoriteSchema
 *        404:
 *          description: Favorite Movie Not Found
 *        500:
 *          description: Internal Server Error
 * */
router.delete("/:id", async (req, res) => {
  try {
    const result = await Favorite.deleteOne({
      user_id: req.body.user_id,
      movie_id: req.body.movie_id,
    });

    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({ code: 200, msg: "Successfully Deleted From Favorites" });
    } else {
      res.status(404).json({ code: 404, msg: "Favorite Movie Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, msg: "Internal Server Error" });
  }
});

async function addFavorite(req, res) {
  await Favorite.create(req.body);
  res
    .status(201)
    .json({ success: true, msg: "Successfully add to favorites." });
}

export default router;
