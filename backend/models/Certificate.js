import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    imageUrl: { type: String, required: true },
    dateIssued: { type: String },
    description: { type: String },
    skillsGained: [{ type: String }],
    category: {
      type: String,
      enum: ["training", "coursework", "vocational", "other"],
      default: "training",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
