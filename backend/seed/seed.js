import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Profile from "../models/Profile.js";
import Certificate from "../models/Certificate.js";
import Project from "../models/Project.js";
import Admin from "../models/Admin.js";

async function seed() {
  await connectDB();

  // ---- Profile ----
  await Profile.deleteMany({});
  await Profile.create({
    name: "Gaurav Tiwari",
    tagline: "Aspiring MERN + AI Developer",
    email: "gaurav@example.com",
    github: "https://github.com/gauravtiwari",
    linkedin: "https://linkedin.com/in/gauravtiwari",
    whatsapp: "https://wa.me/910000000000",
    photoUrl: "/assets/gaurav-photo.jpg",
    resumeUrl: "/assets/Gaurav_Tiwari_Resume.pdf",
    bio: "B.Tech IT student building full-stack MERN applications enhanced with AI, with hands-on training from Samsung Innovation Campus and Indian Railways' Signal & Telecom department.",
    skills: [
      "JavaScript",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Stripe API",
      "Python",
      "C",
      "C++",
      "SQL",
    ],
    education: [
      {
        degree: "B.Tech in Information Technology",
        university: "Deen Dayal Upadhyaya Gorakhpur University",
        year: "2022 - 2026",
        cgpa: "7.6 / 10",
        details:
          "Core coursework in data structures, DBMS, computer networks, and software engineering, alongside self-driven MERN + AI projects.",
      },
    ],
    experience: [
      {
        title: "Python Programming Trainee",
        organization: "Samsung Innovation Campus",
        duration: "2023",
        description:
          "Completed structured training in Python programming fundamentals, data handling, and applied problem solving as part of Samsung's Innovation Campus initiative.",
        type: "training",
      },
      {
        title: "Summer Vocational Trainee",
        organization: "Signal & Telecom Training Center, Indian Railways",
        duration: "2023",
        description:
          "Hands-on vocational training on railway signal and telecom systems, gaining exposure to real-world engineering operations and safety-critical systems.",
        type: "training",
      },
      {
        title: "B.Tech IT Coursework",
        organization: "Deen Dayal Upadhyaya Gorakhpur University",
        duration: "2022 - 2026",
        description:
          "Ongoing undergraduate coursework covering programming, systems, and software development fundamentals.",
        type: "education",
      },
    ],
    aiTrainingNotes:
      "Gaurav is actively looking for MERN/AI developer internships and entry-level roles. He enjoys building automation workflows and integrating payment systems like Stripe into web apps.",
  });

  // ---- Certificates ----
  await Certificate.deleteMany({});
  await Certificate.create([
    {
      title: "Python Programming Trainee",
      issuer: "Samsung Innovation Campus",
      imageUrl: "/assets/certificates/samsung-innovation-campus.jpg",
      dateIssued: "2023",
      description:
        "Completed a structured Python programming training track covering core syntax, data structures, and applied mini-projects as part of the Samsung Innovation Campus program.",
      skillsGained: ["Python", "Problem Solving", "Data Structures"],
      category: "training",
    },
    {
      title: "Summer Vocational Training",
      issuer: "Signal & Telecom Training Center, Indian Railways",
      imageUrl: "/assets/certificates/railways-vocational-training.jpg",
      dateIssued: "2023",
      description:
        "Vocational training on railway signaling and telecommunication systems, covering operational safety and real-world infrastructure exposure.",
      skillsGained: ["Signal Systems", "Telecom Systems", "Technical Documentation"],
      category: "vocational",
    },
    {
      title: "B.Tech IT Coursework Certification",
      issuer: "Deen Dayal Upadhyaya Gorakhpur University",
      imageUrl: "/assets/certificates/ddugu-coursework.jpg",
      dateIssued: "2022 - 2026",
      description:
        "Coursework certificates covering programming fundamentals, database management systems, and computer networks as part of the B.Tech IT curriculum.",
      skillsGained: ["DBMS", "Computer Networks", "Software Engineering"],
      category: "coursework",
    },
  ]);

  // ---- Projects ----
  await Project.deleteMany({});
  await Project.create([
    {
      title: "MERN + AI Automation Website",
      description:
        "A full-stack MERN web app that integrates AI-powered automation workflows to handle repetitive tasks and generate dynamic content.",
      imageUrl: "/assets/projects/mern-ai-automation.jpg",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
      githubUrl: "https://github.com/gauravtiwari/mern-ai-automation",
      liveUrl: "",
      featured: true,
    },
    {
      title: "Stripe API Integration Demo",
      description:
        "A demo e-commerce checkout flow showcasing secure payment processing using the Stripe API within a MERN application.",
      imageUrl: "/assets/projects/stripe-demo.jpg",
      techStack: ["React", "Node.js", "Express", "Stripe API", "MongoDB"],
      githubUrl: "https://github.com/gauravtiwari/stripe-integration-demo",
      liveUrl: "",
      featured: true,
    },
    {
      title: "Interactive Animated Web App",
      description:
        "A visually rich web application demonstrating interactive UI components and micro-animations built with Framer Motion.",
      imageUrl: "/assets/projects/interactive-web-app.jpg",
      techStack: ["React", "TailwindCSS", "Framer Motion"],
      githubUrl: "https://github.com/gauravtiwari/interactive-animated-app",
      liveUrl: "",
      featured: false,
    },
  ]);

  // ---- Admin ----
  await Admin.deleteMany({});
  await Admin.create({
    email: process.env.ADMIN_EMAIL || "admin@gauravtiwari.dev",
    password: process.env.ADMIN_PASSWORD || "change_this_password",
    role: "admin",
  });

  console.log("Seed complete: profile, certificates, projects, admin created.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
