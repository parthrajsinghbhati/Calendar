import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { format } from 'date-fns';

interface RangeActionBarProps {
  startDate: Date | null;
  endDate: Date | null;
  onApply: (text: string) => void;
  onClear: () => void;
}

export const RangeActionBar = ({ startDate, endDate, onApply, onClear }: RangeActionBarProps) => {
  const [text, setText] = useState('');

  if (!startDate || !endDate) return null;

  const handleApply = () => {
    if (text.trim()) {
      onApply(text.trim());
      setText('');
      onClear();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleApply();
    }
  };

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-11/12 max-w-lg z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 dark:border-slate-700 p-4 rounded-2xl transition-all duration-300 animate-in fade-in zoom-in slide-in-from-bottom-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            Selected Range
            <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              {format(startDate, 'MMM d')} - {format(endDate, 'MMM d')}
            </span>
          </h4>
          <button 
            onClick={onClear}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add note to all days..."
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
          />
          <button
            onClick={handleApply}
            disabled={!text.trim()}
            className={cn(
              "p-2 rounded-xl flex items-center gap-2 text-white transition-all text-sm font-semibold px-4",
              text.trim()
                ? "bg-blue-600 hover:bg-blue-700 shadow-md"
                : "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
            )}
          >
            Apply <Check className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
