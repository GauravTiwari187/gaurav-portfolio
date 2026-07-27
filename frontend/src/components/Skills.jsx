import { motion } from "framer-motion";

const ICONS = {
  JavaScript: "🟨",
  "React.js": "⚛️",
  "Node.js": "🟢",
  "Express.js": "🚂",
  MongoDB: "🍃",
  Mongoose: "🔗",
  "Stripe API": "💳",
  Python: "🐍",
  C: "🔵",
  "C++": "🔷",
  SQL: "🗄️",
};

export default function Skills({ skills = [] }) {
  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
      <SectionHeading eyebrow="What I work with" title="Skills" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -4, scale: 1.03 }}
            className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-2xl">{ICONS[skill] || "🛠️"}</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center md:text-left"
    >
      {eyebrow && (
        <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm uppercase tracking-wide">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
        {title}
      </h2>
    </motion.div>
  );
}
