import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./Skills.jsx";

const TYPE_ICON = {
  education: "🎓",
  training: "🛠️",
  internship: "💼",
  work: "🏢",
};

export default function Timeline({ experience = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="experience" className="py-20 px-6 max-w-4xl mx-auto">
      <SectionHeading eyebrow="Journey so far" title="Experience & Education" />

      <div className="mt-10 relative border-l-2 border-brand-200 dark:border-slate-700 ml-4">
        {experience.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="mb-8 ml-6 relative"
            >
              <span className="absolute -left-[34px] top-1 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-brand-500 flex items-center justify-center text-sm">
                {TYPE_ICON[item.type] || "📌"}
              </span>

              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-brand-600 dark:text-brand-400">
                      {item.organization} · {item.duration}
                    </p>
                  </div>
                  <span className="text-slate-400">{isOpen ? "▲" : "▼"}</span>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-sm text-slate-600 dark:text-slate-300 mt-3 overflow-hidden"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
