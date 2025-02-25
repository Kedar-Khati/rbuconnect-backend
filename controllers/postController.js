import Post from "../models/Post.js";
import { verifyToken } from "@clerk/clerk-sdk-node";
/**
 * Create a new post
 */
export const createPost = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract the token
    const payload = await verifyToken(token);

    const userId = payload.sub; // Get the user ID from the `sub` claim
    console.log("User ID:", userId);

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    ///////////////////////
    console.log("Request Auth:", req.auth); // Debugging

    const { description, image } = req.body;
    // const userId = req.auth.userId;

    const post = new Post({ user: userId, description, image });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error); // Debugging
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all posts
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name profilePicture");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Edit a post
 */
export const editPost = async (req, res) => {
  try {
    const { description, image } = req.body;
    const postId = req.params.id;
    const userId = req.auth.userId;

    const post = await Post.findOne({ _id: postId, user: userId });
    if (!post) {
      return res.status(404).json({ error: "Post not found or not authorized" });
    }

    post.description = description || post.description;
    post.image = image || post.image;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a post
 */
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.auth.userId;

    const post = await Post.findOneAndDelete({ _id: postId, user: userId });
    if (!post) {
      return res.status(404).json({ error: "Post not found or not authorized" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
