import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String },
    lastLogin: { type: Date, default: null },  // Store last login timestamp

    // Personal Details
    bio: { type: String },  // Short bio or summary
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },

    // Educational Details
    college: { type: String, required: true },  // Name of the college
    graduationYear: { type: Number, required: true },  // Year of graduation
    degree: { type: String },  // Degree obtained (e.g., B.Tech, MBA)
    major: { type: String },  // Major or specialization (e.g., Computer Science, Marketing)
    currentStatus: { type: String, enum: ["Student", "Alumni", "Faculty"] },  // Current status in the college

    // Professional Details
    currentCompany: { type: String },  // Current employer
    jobTitle: { type: String },  // Job title
    industry: { type: String },  // Industry (e.g., IT, Finance, Healthcare)
    skills: [{ type: String }],  // List of skills (e.g., JavaScript, Project Management)
    workExperience: [
      {
        company: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],

    // Social Connections
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  // List of user connections
    connectionRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  // Pending connection requests

    // Additional Information
    interests: [{ type: String }],  // List of interests (e.g., Coding, Photography)
    certifications: [
      {
        name: { type: String },
        issuingOrganization: { type: String },
        issueDate: { type: Date },
        expirationDate: { type: Date },
      },
    ],
    projects: [
      {
        title: { type: String },
        description: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        link: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;