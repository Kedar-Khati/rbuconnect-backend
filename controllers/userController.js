import User from "../models/User.js"; // Import the User model

// Get user by clerkId
export const getUser = async (req, res) => {
  try {
    const { clerkId } = req.params; // Extract clerkId from the request parameters

    // Find the user by clerkId
    const user = await User.findOne({ clerkId }).select("-__v"); // Exclude the __v field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};