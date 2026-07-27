import { motion } from "framer-motion";
import { SectionHeading } from "./Skills.jsx";

export default function Projects({ projects = [] }) {
  return (
    <section
      id="projects"
      className="py-20 px-6 max-w-6xl mx-auto bg-slate-50 dark:bg-slate-900/40 rounded-3xl"
    >
      <SectionHeading eyebrow="Things I've built" title="Projects" />

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {projects.map((p, i) => (
          <motion.div
            key={p._id || p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow"
          >
            <div className="h-40 overflow-hidden bg-gradient-to-br from-brand-100 to-purple-100 dark:from-slate-800 dark:to-slate-700">
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                {p.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {(p.techStack || []).map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-brand-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-4 text-sm font-semibold">
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    ⭐ GitHub
                  </a>
                )}
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    🔗 Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
