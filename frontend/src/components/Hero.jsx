import { motion } from "framer-motion";

export default function Hero({ profile }) {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-center md:text-left"
      >
        <p className="text-brand-600 dark:text-brand-400 font-semibold mb-2">
          Hi, I'm
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {profile.name}
        </h1>
        <h2 className="mt-3 text-xl md:text-2xl font-medium gradient-text">
          {profile.tagline}
        </h2>
        <p className="mt-5 text-slate-600 dark:text-slate-300 max-w-xl">
          {profile.bio}
        </p>

        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
          <a
            href={profile.resumeUrl}
            download
            className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-600 to-purple-600 text-white font-semibold shadow-lg shadow-brand-600/30 hover:shadow-xl transition-shadow"
          >
            ⬇ Download Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-full border-2 border-brand-600 text-brand-600 dark:text-brand-400 dark:border-brand-400 font-semibold hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex-shrink-0"
      >
        <div className="w-56 h-56 md:w-72 md:h-72 rounded-3xl p-1.5 bg-gradient-to-tr from-brand-500 to-purple-500 shadow-xl rotate-3">
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-full h-full object-cover rounded-3xl border-4 border-white dark:border-slate-950 -rotate-3"
            onError={(e) => {
              e.currentTarget.src =
                "https://ui-avatars.com/api/?name=Gaurav+Tiwari&size=512&background=6366f1&color=fff";
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
