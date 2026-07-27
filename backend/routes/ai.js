import express from "express";
import rateLimit from "express-rate-limit";
import Profile from "../models/Profile.js";
import Certificate from "../models/Certificate.js";
import Project from "../models/Project.js";

const router = express.Router();

// Basic abuse protection since this route triggers a paid/limited external call
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: { message: "Too many requests, please slow down." },
});

async function buildContext() {
  const [profile, certificates, projects] = await Promise.all([
    Profile.findOne(),
    Certificate.find(),
    Project.find(),
  ]);

  return `
You are the AI assistant embedded in Gaurav Tiwari's personal portfolio website.
Answer questions ONLY using the information below. Be concise, friendly, and
professional. If asked something unrelated to Gaurav's profile, politely
redirect the conversation back to his skills, projects, certificates, or
experience. Never invent facts that aren't in this context.

PROFILE:
Name: ${profile?.name}
Tagline: ${profile?.tagline}
Bio: ${profile?.bio || "N/A"}
Email: ${profile?.email}
GitHub: ${profile?.github}
LinkedIn: ${profile?.linkedin}
Skills: ${(profile?.skills || []).join(", ")}

EDUCATION:
${(profile?.education || [])
  .map((e) => `- ${e.degree} at ${e.university} (${e.year})${e.cgpa ? `, CGPA: ${e.cgpa}` : ""}`)
  .join("\n")}

EXPERIENCE / TRAINING:
${(profile?.experience || [])
  .map((e) => `- ${e.title} @ ${e.organization} (${e.duration}): ${e.description || ""}`)
  .join("\n")}

CERTIFICATES:
${certificates
  .map(
    (c) =>
      `- ${c.title} issued by ${c.issuer} (${c.dateIssued || "date N/A"}). ${
        c.description || ""
      } Skills gained: ${(c.skillsGained || []).join(", ")}`
  )
  .join("\n")}

PROJECTS:
${projects
  .map(
    (p) =>
      `- ${p.title}: ${p.description} Tech: ${(p.techStack || []).join(", ")}${
        p.githubUrl ? ` GitHub: ${p.githubUrl}` : ""
      }${p.liveUrl ? ` Live: ${p.liveUrl}` : ""}`
  )
  .join("\n")}

ADDITIONAL NOTES FROM ADMIN:
${profile?.aiTrainingNotes || "None"}
`;
}

// POST /api/ai/ask  { question }
router.post("/ask", aiLimiter, async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ message: "'question' is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        message:
          "GEMINI_API_KEY is not configured on the server. Add it to backend/.env",
      });
    }

    const context = await buildContext();

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${context}\n\nUSER QUESTION: ${question}` }],
            },
          ],
          generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini API error:", errText);
      return res.status(502).json({ message: "AI provider error", detail: errText });
    }

    const data = await geminiRes.json();
    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response right now.";

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;