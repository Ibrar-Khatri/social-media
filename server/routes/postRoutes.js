import express from "express";

import {
  createPost,
  getPost,
  getPosts,
} from "../controllers/postController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();
//create posts
router.post("/create-post", userAuth, createPost);

//get posts
router.post("/", userAuth, getPosts);
router.post("/:id", userAuth, getPost);

export default router;
