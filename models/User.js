import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    photo: { type: String },
    lastLogin: { type: Date, default: null },  // Store last login timestamp
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
