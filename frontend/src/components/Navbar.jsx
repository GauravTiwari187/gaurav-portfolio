import { useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle.jsx";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-40 backdrop-blur-lg bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="font-display font-bold text-lg gradient-text"
        >
          Gaurav Tiwari
        </button>

        <div className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-slate-700 dark:text-slate-200 text-xl"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-2 px-6 pb-4">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-left py-2 text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </motion.nav>
  );
}
