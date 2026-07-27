import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { api } from "../utils/api.js";
import { speak } from "../utils/speech.js";

export default function CertificateModal({ certificate, onClose }) {
  const [aiExplanation, setAiExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  if (!certificate) return null;

  const askAIAboutCertificate = async () => {
    setLoading(true);
    setAiExplanation("");
    try {
      const { answer } = await api.askAI(
        `Explain the context of the "${certificate.title}" certificate issued by ${certificate.issuer} — what training did Gaurav undergo and what skills did he gain?`
      );
      setAiExplanation(answer);
      speak(answer);
    } catch (err) {
      setAiExplanation("Couldn't reach the AI assistant right now: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto"
        >
          <div className="relative">
            <img
              src={certificate.imageUrl}
              alt={certificate.title}
              className="w-full h-56 object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center shadow"
            >
              ✕
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {certificate.title}
            </h3>
            <p className="text-brand-600 dark:text-brand-400 font-medium">
              {certificate.issuer} · {certificate.dateIssued}
            </p>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm">
              {certificate.description}
            </p>

            {certificate.skillsGained?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {certificate.skillsGained.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-1 rounded-full bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-brand-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={askAIAboutCertificate}
              disabled={loading}
              className="mt-5 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-semibold disabled:opacity-60"
            >
              {loading ? "Asking AI…" : "🤖 Ask AI to explain this certificate"}
            </button>

            {aiExplanation && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200">
                {aiExplanation}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
