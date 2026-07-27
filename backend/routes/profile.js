import express from "express";
import Profile from "../models/Profile.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// GET /api/profile - public, returns the single profile document
router.get("/", async (req, res) => {
  const profile = await Profile.findOne();
  if (!profile) return res.status(404).json({ message: "Profile not seeded yet" });
  res.json(profile);
});

// PUT /api/profile - admin only, updates the single profile document
router.put("/", requireAuth, requireRole("admin"), async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create(req.body);
  } else {
    profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
  }
  res.json(profile);
});

export default router;
