import express from "express";
import Certificate from "../models/Certificate.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// GET /api/certificates - public
router.get("/", async (req, res) => {
  const certificates = await Certificate.find().sort({ createdAt: -1 });
  res.json(certificates);
});

// GET /api/certificates/:id - public
router.get("/:id", async (req, res) => {
  const cert = await Certificate.findById(req.params.id);
  if (!cert) return res.status(404).json({ message: "Not found" });
  res.json(cert);
});

// POST /api/certificates - admin only
router.post("/", requireAuth, requireRole("admin"), async (req, res) => {
  const cert = await Certificate.create(req.body);
  res.status(201).json(cert);
});

// PUT /api/certificates/:id - admin only
router.put("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!cert) return res.status(404).json({ message: "Not found" });
  res.json(cert);
});

// DELETE /api/certificates/:id - admin only
router.delete("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  const cert = await Certificate.findByIdAndDelete(req.params.id);
  if (!cert) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

export default router;
