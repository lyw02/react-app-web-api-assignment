import express from "express";
import User from "./userModel";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router(); // eslint-disable-line

/**
 * @swagger
 * /api/users:
 *    get:
 *      tags:
 *      - users
 *      summary: Get all users
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            ref: #/userModel/UserSchema
 * */
router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

/**
 * @swagger
 * /api/users/{username}:
 *    get:
 *      tags:
 *      - users
 *      summary: Get user by username
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: username
 *        in: path
 *        description: username
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: Successfully Deleted From Favorites
 *          schema:
 *            ref: #/userModel/UserSchema
 * */
router.get("/:username", async (req, res) => {
  const user = await User.find({ username: req.params.username });
  res.status(200).json(user);
});

/**
 * @swagger
 * /api/users:
 *    post:
 *      tags:
 *      - users
 *      summary: register(Create)/Authenticate User
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: action
 *        in: query
 *        description: action may be register
 *        required: false
 *        type: string
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            ref: #/userModel/UserSchema
 *        400:
 *          description: Username and password are required
 *        500:
 *          description: Internal server error
 * */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      if (!req.body.username || !req.body.password) {
        return res
          .status(400)
          .json({ success: false, msg: "Username and password are required." });
      }
      if (req.query.action === "register") {
        await registerUser(req, res);
      } else {
        await authenticateUser(req, res);
      }
    } catch (error) {
      // Log the error and return a generic error message
      console.error(error);
      res.status(500).json({ success: false, msg: "Internal server error." });
    }
  })
);

/**
 * @swagger
 * /api/users/{userId}:
 *    put:
 *      tags:
 *      - users
 *      summary: Update a user
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: userId
 *        in: path
 *        description: user id
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: User Updated Sucessfully
 *          schema:
 *            ref: #/userModel/UserSchema
 *        404:
 *          description: Unable to Update User
 * */
router.put("/:id", async (req, res) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(req.body.password, saltRounds);
  const result = await User.findOneAndUpdate(
    { username: req.body.username },
    { $set: { password: hash } },
    { new: true }
  );
  if (result.matchedCount) {
    res.status(200).json({ code: 200, msg: "User Updated Sucessfully" });
  } else {
    res.status(404).json({ code: 404, msg: "Unable to Update User" });
  }
});

async function registerUser(req, res) {
  // Add input validation logic here
  await User.create(req.body);
  res.status(201).json({ success: true, msg: "User successfully created." });
}

async function authenticateUser(req, res) {
  const user = await User.findByUserName(req.body.username);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, msg: "Authentication failed. User not found." });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    const token = jwt.sign({ username: user.username }, process.env.SECRET);
    res.status(200).json({ success: true, token: "BEARER " + token });
  } else {
    res.status(401).json({ success: false, msg: "Wrong password." });
  }
}

export default router;
