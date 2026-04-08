
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/20 hover:bg-white/40 dark:bg-slate-800/50 dark:hover:bg-slate-700/80 backdrop-blur text-slate-800 dark:text-slate-200 transition-all shadow-sm flex items-center justify-center border border-white/30 dark:border-slate-600/50"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
    </button>
  );
};
