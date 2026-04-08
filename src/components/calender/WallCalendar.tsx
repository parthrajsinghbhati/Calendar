import { useState } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { TopBinding } from './TopBinding';
import { HeroImage } from './HeroImage';
import { CalendarGrid } from './CalendarGrid';
import { NotesSection } from './NotesSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../../utils/cn';
import { RangeActionBar } from './RangeActionBar';

export const WallCalendar = () => {
  const { 
    currentDate, nextMonth, prevMonth, jumpToToday,
    startDate, endDate, selectDate, clearSelection,
    notes, addNote, addNoteToRange 
  } = useCalendar();

  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [showMobileNotes, setShowMobileNotes] = useState(false);

  const handleNext = () => {
    if (isFlipping) return;
    setFlipDirection('next');
    setIsFlipping(true);
    setTimeout(() => {
      nextMonth();
      setIsFlipping(false);
    }, 400);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    setTimeout(() => {
      prevMonth();
      setIsFlipping(false);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 lg:p-8 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 perspective-1000">
      
      {/* Header with Theme Toggle */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 z-10 px-2 lg:px-0">
        <h1 className="text-2xl font-serif text-slate-800 dark:text-slate-100 uppercase tracking-widest font-bold">
          Calendar
        </h1>
        <ThemeToggle />
      </div>

      {/* Main Calendar Container */}
      <div className="relative w-full max-w-5xl h-[85vh] min-h-[600px] bg-white dark:bg-slate-900 shadow-2xl rounded-sm overflow-hidden flex flex-col mx-auto">
        <TopBinding />

        {/* 3D Flip Wrapper */}
        <div className={cn(
          "w-full h-full flex flex-col lg:flex-row flex-1 z-0 overflow-hidden",
          isFlipping && flipDirection === 'next' ? "animate-flip-up" : "",
          isFlipping && flipDirection === 'prev' ? "animate-flip-down" : ""
        )}>

          {/* Left Column (Desktop) / Top (Mobile) - Image & Grid */}
          <div className="w-full lg:w-[65%] flex flex-col relative z-0 h-full overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
            <HeroImage currentDate={currentDate} className="h-[25vh] lg:h-[40%] shrink-0" />
            <CalendarGrid 
              currentDate={currentDate} 
              startDate={startDate} 
              endDate={endDate}
              onSelectDate={selectDate}
              notes={notes}
            />
          </div>

          {/* Right Column (Desktop) / Bottom Column (Mobile) - Notes */}
          <div className={cn(
            "w-full lg:w-[35%] flex flex-col shrink-0 lg:h-full",
            // Mobile Dropdown / Bottom Sheet overlay styling
            "absolute inset-x-0 bottom-0 z-20 transition-transform duration-300 ease-out shadow-[0_-10px_40px_rgba(0,0,0,0.15)] lg:shadow-none bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 lg:border-t-0",
            showMobileNotes ? "translate-y-0 h-[60%]" : "translate-y-full lg:translate-y-0 h-[60%] lg:h-full",
            // Desktop reset overlay
            "lg:relative lg:inset-auto"
          )}>
            <NotesSection 
              selectedDate={startDate} 
              notes={notes}
              onAddNote={addNote}
            />
          </div>

        </div>

        <RangeActionBar 
          startDate={startDate}
          endDate={endDate}
          onApply={addNoteToRange}
          onClear={clearSelection}
        />

        <div className="w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 flex justify-between items-center z-10 relative">
           <button 
             onClick={handlePrev} 
             disabled={isFlipping}
             className="px-4 py-2 flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider text-sm font-semibold disabled:opacity-50"
           >
             <ChevronLeft className="mr-1 w-4 h-4" /> Prev
           </button>
           
           <div className="flex gap-2">
             <button 
               onClick={jumpToToday}
               className="px-4 py-2 text-xs lg:text-sm font-semibold rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors shadow-sm"
             >
               Today
             </button>
             <button 
               onClick={() => setShowMobileNotes(p => !p)}
               className={cn(
                 "lg:hidden px-4 py-2 text-xs font-semibold rounded-full transition-colors shadow-sm",
                 showMobileNotes ? "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700" : "bg-blue-500 text-white hover:bg-blue-600"
               )}
             >
               {showMobileNotes ? "Close Notes" : "Write Note"}
             </button>
           </div>

           <button 
             onClick={handleNext} 
             disabled={isFlipping}
             className="px-4 py-2 flex items-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider text-sm font-semibold disabled:opacity-50"
           >
             Next <ChevronRight className="ml-1 w-4 h-4" />
           </button>
        </div>
      </div>
      
    </div>
  );
};
