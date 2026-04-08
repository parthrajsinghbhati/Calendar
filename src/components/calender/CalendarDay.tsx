
import { cn } from '../../utils/cn';
import { isSameDay, format, isToday } from 'date-fns';


interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  onSelect: (date: Date) => void;
  hasNote: boolean;
}

export const CalendarDay = ({
  date,
  isCurrentMonth,
  selectedStart,
  selectedEnd,
  onSelect,
  hasNote
}: CalendarDayProps) => {
  const isStart = selectedStart && isSameDay(date, selectedStart);
  const isEnd = selectedEnd && isSameDay(date, selectedEnd);
  const isInRange = selectedStart && selectedEnd && date > selectedStart && date < selectedEnd;
  const today = isToday(date);
  
  return (
    <div className="relative p-0.5">
      <button
        onClick={() => onSelect(date)}
        className={cn(
          "w-full h-8 lg:h-12 flex flex-col items-center justify-center relative select-none transition-all",
          "text-xs lg:text-sm font-medium rounded-full",
          // Base colors based on month
          isCurrentMonth 
            ? "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" 
            : "text-slate-300 dark:text-slate-600 cursor-default hover:bg-transparent",
            
          // In range selected
          isInRange && isCurrentMonth && "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded-none",
          
          // Selection ends
          (isStart || isEnd) && "bg-blue-500 text-white shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-full z-10",
          isStart && selectedEnd && "rounded-r-none",
          isEnd && selectedStart && "rounded-l-none",
          
          // Current day indicator
          today && !isStart && !isEnd && "border border-blue-400 text-blue-600 dark:text-blue-400"
        )}
        disabled={!isCurrentMonth}
      >
        <span>{format(date, 'd')}</span>
        
        {/* Note indicator */}
        {hasNote && (
          <div className={cn(
            "absolute bottom-1.5 w-1.5 h-1.5 rounded-full",
            (isStart || isEnd) ? "bg-white" : "bg-blue-500 dark:bg-blue-400"
          )} />
        )}
      </button>
      
        {/* Connect the range visually between days */}
      {isStart && selectedEnd && (
        <div className="absolute inset-y-0.5 right-0 w-1/2 bg-blue-50 dark:bg-blue-900/30 -z-10" />
      )}
      {isEnd && selectedStart && (
        <div className="absolute inset-y-0.5 left-0 w-1/2 bg-blue-50 dark:bg-blue-900/30 -z-10" />
      )}
    </div>
  );
};