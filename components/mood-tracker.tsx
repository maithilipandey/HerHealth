'use client';

import { useEffect, useState } from 'react';
import { MoodEntry, getMoodEntries, saveMoodEntry } from '@/lib/storage';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const MOODS = [
  { value: 1, emoji: '😢', label: 'Sad' },
  { value: 2, emoji: '😕', label: 'Meh' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Great' },
];

const ENERGY_LEVELS = [
  { value: 1, label: 'Very Low' },
  { value: 2, label: 'Low' },
  { value: 3, label: 'Medium' },
  { value: 4, label: 'High' },
  { value: 5, label: 'Very High' },
];

export function MoodTracker() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [notes, setNotes] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const loaded = getMoodEntries();
    setEntries(loaded);
    const entry = loaded.find(e => e.date === selectedDate);
    if (entry) {
      setMood(entry.mood);
      setEnergy(entry.energy);
      setNotes(entry.notes);
    } else {
      setMood(3);
      setEnergy(3);
      setNotes('');
    }
  }, []);

  useEffect(() => {
    const entry = entries.find(e => e.date === selectedDate);
    if (entry) {
      setMood(entry.mood);
      setEnergy(entry.energy);
      setNotes(entry.notes);
    } else {
      setMood(3);
      setEnergy(3);
      setNotes('');
    }
  }, [selectedDate, entries]);

  function handleSaveEntry() {
    const entry: MoodEntry = { date: selectedDate, mood, energy, notes };
    saveMoodEntry(entry);
    const updated = getMoodEntries();
    setEntries(updated);
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-2">Mood Tracker</h2>
        <p className="text-muted-foreground">Track your mood and energy levels daily</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-6 animate-fade-in-up border-primary/20 hover:shadow-lg transition-smooth" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              >
                ←
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentMonth(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              >
                →
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-sm text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map(day => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const entry = entries.find(e => e.date === dateStr);
              const moodObj = MOODS.find(m => m.value === entry?.mood);
              
              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all ${
                    selectedDate === dateStr
                      ? 'ring-2 ring-primary'
                      : ''
                  } ${
                    entry
                      ? 'bg-accent/20'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {entry ? (
                    <>
                      <div className="text-lg">{moodObj?.emoji}</div>
                      <div className="text-xs font-semibold text-muted-foreground">{format(day, 'd')}</div>
                    </>
                  ) : (
                    <div className="text-xs font-semibold text-muted-foreground">{format(day, 'd')}</div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 animate-fade-in-up border-accent/20 hover:shadow-lg transition-smooth" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold mb-4">
            How are you feeling on {format(parseISO(selectedDate), 'MMM d')}?
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-3 text-muted-foreground">Mood</p>
              <div className="flex justify-between gap-2">
                {MOODS.map((m, idx) => (
                  <button
                    key={m.value}
                    onClick={() => setMood(m.value)}
                    className={`flex-1 py-2 rounded-lg transition-all text-xl hover:scale-110 animate-fade-in-up ${
                      mood === m.value
                        ? 'bg-primary scale-110 animate-heartbeat'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {m.emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 text-muted-foreground">Energy Level</p>
              <div className="space-y-1">
                {ENERGY_LEVELS.map(level => (
                  <button
                    key={level.value}
                    onClick={() => setEnergy(level.value)}
                    className={`w-full py-2 px-3 rounded-lg text-sm transition-all ${
                      energy === level.value
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-muted-foreground block mb-2">
                Notes (optional)
              </label>
              <Textarea
                placeholder="What's on your mind?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-24"
              />
            </div>

            <Button onClick={handleSaveEntry} className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300">
              Save Mood
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
