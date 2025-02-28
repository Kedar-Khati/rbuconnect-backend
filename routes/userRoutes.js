import express from "express";
import { getUser } from "../controllers/userController.js"; // Import the getUser function
import { requireAuth } from '../middleware/authMiddleware.js' 

const router = express.Router();

console.log("User routes loaded"); // Debugging log

// GET user by clerkId
router.get("/:clerkId", getUser);

export default router;