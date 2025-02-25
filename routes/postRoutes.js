import express from "express";
import { createPost, getPosts, editPost, deletePost } from "../controllers/postController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, createPost);
router.get("/", getPosts);
router.put("/:id", requireAuth, editPost); // Edit post
router.delete("/:id", requireAuth, deletePost); // Delete post

export default router;
