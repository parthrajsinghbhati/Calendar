import { useState } from 'react';
import { addMonths, subMonths, eachDayOfInterval } from 'date-fns';
import { formatDateKey } from '../utils/dateHelpers';

export interface CalendarNote {
  id: string;
  dateKey: string;
  text: string;
}

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const selectDate = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const jumpToToday = () => {
    setCurrentDate(new Date());
    setStartDate(null);
    setEndDate(null);
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const addNote = (dateKey: string, text: string) => {
    setNotes(prev => ({ ...prev, [dateKey]: text }));
  };

  const addNoteToRange = (text: string) => {
    if (!startDate || !endDate) return;
    
    const start = startDate < endDate ? startDate : endDate;
    const end = startDate > endDate ? startDate : endDate;
    
    const days = eachDayOfInterval({ start, end });
    
    setNotes(prev => {
      const nextNotes = { ...prev };
      days.forEach(day => {
        const dateKey = formatDateKey(day);
        if (nextNotes[dateKey]) {
          nextNotes[dateKey] = `${nextNotes[dateKey]}\n${text}`;
        } else {
          nextNotes[dateKey] = text;
        }
      });
      return nextNotes;
    });
  };

  return {
    currentDate,
    nextMonth,
    prevMonth,
    jumpToToday,
    startDate,
    endDate,
    selectDate,
    clearSelection,
    notes,
    addNote,
    addNoteToRange
  };
}
