import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./Skills.jsx";
import CertificateModal from "./CertificateModal.jsx";

export default function Certificates({ certificates = [] }) {
  const [active, setActive] = useState(null);

  return (
    <section id="certificates" className="py-20 px-6 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Verified learning" title="Certificates" />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {certificates.map((cert, i) => (
          <motion.button
            key={cert._id || cert.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setActive(cert)}
            className="text-left bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow"
          >
            <div className="h-40 bg-gradient-to-br from-brand-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {cert.title}
              </h3>
              <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
                {cert.issuer}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <CertificateModal certificate={active} onClose={() => setActive(null)} />
    </section>
  );
}
