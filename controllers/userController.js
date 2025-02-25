import User from "../models/User.js";

/**
 * Create or update user based on Clerk authentication
 */
export const createUser = async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName, imageUrl } = req.auth.user;
    const name = `${firstName} ${lastName}`;

    let user = await User.findOne({ clerkId });
    if (!user) {
      user = new User({ clerkId, email, name, profilePicture: imageUrl });
      await user.save();
    }
    else{
      res.status(400).json({message:"User already exists"});
    }
    res.status.json()
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



