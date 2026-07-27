import express from "express";
import Project from "../models/Project.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
  res.json(projects);
});

router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Not found" });
  res.json(project);
});

router.post("/", requireAuth, requireRole("admin"), async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

router.put("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!project) return res.status(404).json({ message: "Not found" });
  res.json(project);
});

router.delete("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

export default router;
