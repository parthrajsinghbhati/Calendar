import { getMonthDaysWithPadding, formatDateKey } from '../../utils/dateHelpers';
import { CalendarDay } from './CalendarDay';
import { isSameMonth, format } from 'date-fns';

interface CalendarGridProps {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  onSelectDate: (date: Date) => void;
  notes: Record<string, string>;
}

export const CalendarGrid = ({
  currentDate,
  startDate,
  endDate,
  onSelectDate,
  notes
}: CalendarGridProps) => {
  const days = getMonthDaysWithPadding(currentDate);
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="flex-1 w-full bg-white dark:bg-slate-900 px-4 pb-4 lg:px-8 mt-2 lg:mt-6 flex flex-col justify-start overflow-hidden">
      
      {/* Month / Year Header */}
      <div className="flex justify-end mb-2 z-10 text-right shrink-0">
        <div>
          <h2 className="text-xl lg:text-2xl font-light text-slate-500 dark:text-slate-400 leading-none">
            {format(currentDate, 'yyyy')}
          </h2>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white drop-shadow-sm tracking-widest uppercase line-clamp-1">
            {format(currentDate, 'MMMM')}
          </h1>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 shrink-0">
        {weekDays.map(day => (
          <div key={day} className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days grid - ensuring it scales smoothly */}
      <div className="grid grid-cols-7 gap-y-0.5 gap-x-1 mt-1 flex-1 items-start content-start">
        {days.map(day => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const dateKey = formatDateKey(day);
          const hasNote = !!(notes[dateKey] && notes[dateKey].trim().length > 0);
          
          return (
            <CalendarDay
              key={dateKey}
              date={day}
              isCurrentMonth={isCurrentMonth}
              selectedStart={startDate}
              selectedEnd={endDate}
              onSelect={onSelectDate}
              hasNote={hasNote}
            />
          );
        })}
      </div>
    </div>
  );
};
