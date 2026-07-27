import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-105 transition-transform"
    >
      {theme === "dark" ? (
        <span className="text-yellow-300 text-lg">☀️</span>
      ) : (
        <span className="text-slate-700 text-lg">🌙</span>
      )}
    </button>
  );
}
