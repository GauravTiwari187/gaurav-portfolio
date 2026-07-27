import { useEffect, useState } from "react";
import { api } from "../utils/api.js";
import {
  fallbackProfile,
  fallbackCertificates,
  fallbackProjects,
} from "../data/profileData.js";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Skills from "../components/Skills.jsx";
import Projects from "../components/Projects.jsx";
import Certificates from "../components/Certificates.jsx";
import Timeline from "../components/Timeline.jsx";
import Contact from "../components/Contact.jsx";
import AIAssistant from "../components/AIAssistant.jsx";

export default function Portfolio() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [certificates, setCertificates] = useState(fallbackCertificates);
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => {});
    api.getCertificates().then(setCertificates).catch(() => {});
    api.getProjects().then(setProjects).catch(() => {});
  }, []);

  // Combine education (with CGPA) and non-education experience into one timeline,
  // avoiding duplicate "B.Tech" entries between the two arrays.
  const timelineItems = [
    ...(profile.education || []).map((e) => ({
      title: e.degree,
      organization: e.university,
      duration: e.year,
      description: `${e.details || ""} ${e.cgpa ? `Current CGPA: ${e.cgpa}.` : ""}`.trim(),
      type: "education",
    })),
    ...(profile.experience || []).filter((e) => e.type !== "education"),
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <Hero profile={profile} />
      <Skills skills={profile.skills} />
      <Projects projects={projects} />
      <Certificates certificates={certificates} />
      <Timeline experience={timelineItems} />
      <Contact profile={profile} />

      <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} {profile.name}. Built with the MERN stack + AI.
      </footer>

      <AIAssistant />
    </div>
  );
}
