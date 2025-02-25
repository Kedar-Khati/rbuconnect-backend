import express from "express";
import { createUser } from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("User routes loaded"); // Debugging log

router.post("/create", (req, res, next) => {
  console.log("Received request at /create");
  next();
}, createUser);

export default router;
