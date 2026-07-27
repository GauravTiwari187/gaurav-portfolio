import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    university: { type: String, required: true },
    year: { type: String, required: true }, // e.g. "2022 - 2026"
    cgpa: { type: String },
    details: { type: String },
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ["education", "training", "internship", "work"],
      default: "training",
    },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Gaurav Tiwari" },
    tagline: { type: String, default: "Aspiring MERN + AI Developer" },
    email: { type: String, required: true },
    github: { type: String },
    linkedin: { type: String },
    whatsapp: { type: String },
    photoUrl: { type: String },
    resumeUrl: { type: String },
    bio: { type: String },
    role: { type: String, default: "user" }, // "user" for the public profile doc
    skills: [{ type: String }],
    education: [educationSchema],
    experience: [experienceSchema],
    // Extra free-text notes an admin can add to steer the AI assistant's answers
    aiTrainingNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
