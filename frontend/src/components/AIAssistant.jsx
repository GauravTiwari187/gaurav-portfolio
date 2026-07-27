import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../utils/api.js";
import { speak, stopSpeaking, isSpeechSupported } from "../utils/speech.js";

const SUGGESTIONS = [
  "Tell me about Gaurav's projects",
  "What certificates does Gaurav have?",
  "What skills does Gaurav know?",
  "Tell me about his railway training",
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm Gaurav's AI assistant. Ask me about his skills, projects, certificates, or experience — or try the search box below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const sendQuestion = async (question) => {
    if (!question.trim()) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    try {
      const { answer } = await api.askAI(question);
      setMessages((m) => [...m, { role: "assistant", text: answer }]);
      if (voiceOn) speak(answer);
    } catch (err) {
      const errText =
        "I couldn't reach the AI service. Make sure the backend is running and GEMINI_API_KEY is set.";
      setMessages((m) => [...m, { role: "assistant", text: errText }]);
    } finally {
      setLoading(false);
    }
  };

  const runSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    try {
      const results = await api.search(searchTerm);
      setSearchResults(results);
    } catch (err) {
      setSearchResults({ error: err.message });
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-brand-600 to-purple-600 text-white text-2xl shadow-xl shadow-brand-600/40 flex items-center justify-center"
        aria-label="Open AI Assistant"
      >
        {open ? "✕" : "🤖"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm h-[70vh] max-h-[560px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 bg-gradient-to-r from-brand-600 to-purple-600 text-white flex items-center justify-between">
              <div>
                <p className="font-semibold">Ask about Gaurav</p>
                <p className="text-xs text-white/80">AI-powered profile assistant</p>
              </div>
              {isSpeechSupported() && (
                <button
                  onClick={() => {
                    setVoiceOn((v) => !v);
                    stopSpeaking();
                  }}
                  className="text-xl"
                  title={voiceOn ? "Voice output on" : "Voice output off"}
                >
                  {voiceOn ? "🔊" : "🔇"}
                </button>
              )}
            </div>

            {/* Quick search */}
            <form onSubmit={runSearch} className="p-3 border-b border-slate-200 dark:border-slate-800">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Quick search: "skills", "stripe", "railways"…'
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {searchResults && (
                <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 max-h-24 overflow-y-auto space-y-1">
                  {searchResults.error && <p className="text-red-500">{searchResults.error}</p>}
                  {searchResults.skills?.length > 0 && (
                    <p>🛠️ Skills: {searchResults.skills.join(", ")}</p>
                  )}
                  {searchResults.projects?.length > 0 && (
                    <p>💻 Projects: {searchResults.projects.map((p) => p.title).join(", ")}</p>
                  )}
                  {searchResults.certificates?.length > 0 && (
                    <p>📜 Certificates: {searchResults.certificates.map((c) => c.title).join(", ")}</p>
                  )}
                  {searchResults.skills?.length === 0 &&
                    searchResults.projects?.length === 0 &&
                    searchResults.certificates?.length === 0 && <p>No matches found.</p>}
                </div>
              )}
            </form>

            {/* Chat messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-brand-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm px-3 py-2 rounded-xl max-w-[60%]">
                  Thinking…
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="px-3 flex gap-2 overflow-x-auto pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendQuestion(s)}
                  className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-slate-700"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendQuestion(input);
              }}
              className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold disabled:opacity-60"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
