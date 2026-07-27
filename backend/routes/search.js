import express from "express";
import Profile from "../models/Profile.js";
import Certificate from "../models/Certificate.js";
import Project from "../models/Project.js";

const router = express.Router();

// GET /api/search?q=stripe  -> searches across skills, projects, certificates
router.get("/", async (req, res) => {
  const q = (req.query.q || "").trim();
  if (!q) return res.status(400).json({ message: "Query param 'q' is required" });

  const regex = new RegExp(q, "i");

  const [profile, certificates, projects] = await Promise.all([
    Profile.findOne(),
    Certificate.find({
      $or: [
        { title: regex },
        { issuer: regex },
        { description: regex },
        { skillsGained: regex },
      ],
    }),
    Project.find({
      $or: [{ title: regex }, { description: regex }, { techStack: regex }],
    }),
  ]);

  const matchedSkills = profile ? profile.skills.filter((s) => regex.test(s)) : [];

  res.json({
    query: q,
    skills: matchedSkills,
    certificates,
    projects,
  });
});

export default router;
