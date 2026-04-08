import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { formatDateKey } from '../../utils/dateHelpers';

interface NotesSectionProps {
  selectedDate: Date | null;
  notes: Record<string, string>;
  onAddNote: (dateKey: string, note: string) => void;
}

export const NotesSection = ({ selectedDate, notes, onAddNote }: NotesSectionProps) => {
  const [currentText, setCurrentText] = useState('');
  const dateKey = selectedDate ? formatDateKey(selectedDate) : null;

  useEffect(() => {
    if (dateKey) {
      setCurrentText(notes[dateKey] || '');
    } else {
      setCurrentText('');
    }
  }, [dateKey, notes]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(e.target.value);
    if (dateKey) {
      onAddNote(dateKey, e.target.value);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full min-h-[250px]">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 font-serif uppercase tracking-wider">
        Notes
      </h3>
      {selectedDate ? (
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4 block">
          For {format(selectedDate, 'MMM do, yyyy')}
        </span>
      ) : (
        <span className="text-xs text-slate-400 dark:text-slate-500 mb-4 block italic">
          Select a date to write notes.
        </span>
      )}
      
      <div className="relative flex-1 overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e2e8f0 27px, #e2e8f0 28px)',
            backgroundPosition: '0 1.5rem',
          }}
        ></div>
        
        <div 
          className="hidden dark:block absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #334155 27px, #334155 28px)',
            backgroundPosition: '0 1.5rem',
          }}
        ></div>
        
        <textarea
          value={currentText}
          onChange={handleChange}
          disabled={!selectedDate}
          placeholder={selectedDate ? "Start writing..." : ""}
          className="w-full h-full bg-transparent resize-none outline-none text-slate-700 dark:text-slate-300 relative z-10 placeholder-slate-400 dark:placeholder-slate-600"
          style={{
            lineHeight: '28px',
            paddingTop: '6px'
          }}
        />
      </div>
    </div>
  );
};
