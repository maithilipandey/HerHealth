'use client';

import { useEffect, useState } from 'react';
import { PeriodEntry, getPeriodEntries, savePeriodEntry, getUserProfile } from '@/lib/storage';
import { format, addDays, differenceInDays, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function PeriodTracker() {
  const [entries, setEntries] = useState<PeriodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [flowIntensity, setFlowIntensity] = useState<'light' | 'medium' | 'heavy' | 'none'>('none');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [cycleInfo, setCycleInfo] = useState({ daysUntilPeriod: 0, dayOfCycle: 0 });

  useEffect(() => {
    const loaded = getPeriodEntries();
    setEntries(loaded);
    calculateCycleInfo(loaded);
  }, []);

  function calculateCycleInfo(periodEntries: PeriodEntry[]) {
    const profile = getUserProfile();
    const lastPeriodDate = parseISO(profile.lastPeriodDate);
    const today = new Date();
    const dayOfCycle = differenceInDays(today, lastPeriodDate) % profile.cycleLength;
    const daysUntilPeriod = profile.cycleLength - dayOfCycle;
    setCycleInfo({ daysUntilPeriod, dayOfCycle });
  }

  function handleSaveEntry() {
    const entry: PeriodEntry = { date: selectedDate, flowIntensity };
    savePeriodEntry(entry);
    const updated = getPeriodEntries();
    setEntries(updated);
    setFlowIntensity('none');
  }

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getFlowColor = (intensity: string) => {
    switch (intensity) {
      case 'light':
        return 'bg-pink-200';
      case 'medium':
        return 'bg-pink-400';
      case 'heavy':
        return 'bg-pink-600';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-2">Period Tracker</h2>
        <p className="text-muted-foreground">Track your menstrual cycle and flow intensity</p>
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
                onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
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
                onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
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
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {days.map(day => {
              const dateStr = format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day), 'yyyy-MM-dd');
              const entry = entries.find(e => e.date === dateStr);
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`aspect-square rounded-lg font-semibold transition-all ${
                    entry
                      ? getFlowColor(entry.flowIntensity)
                      : 'bg-muted hover:bg-muted/80'
                  } ${
                    selectedDate === dateStr
                      ? 'ring-2 ring-primary'
                      : ''
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 animate-fade-in-up border-accent/20 hover:shadow-lg transition-smooth" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold mb-4">Cycle Info</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1 animate-pulse">
                {cycleInfo.daysUntilPeriod}
              </div>
              <p className="text-sm text-muted-foreground">Days until next period</p>
            </div>
            <div className="text-center pt-4 border-t">
              <div className="text-2xl font-bold text-accent mb-1">
                {cycleInfo.dayOfCycle}
              </div>
              <p className="text-sm text-muted-foreground">Day of cycle</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-sm font-semibold text-muted-foreground">Flow intensity on {format(parseISO(selectedDate), 'MMM d')}</p>
            <div className="flex gap-2">
              {['light', 'medium', 'heavy', 'none'].map(intensity => (
                <button
                  key={intensity}
                  onClick={() => setFlowIntensity(intensity as any)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    flowIntensity === intensity
                      ? intensity === 'none'
                        ? 'bg-gray-300 text-foreground'
                        : intensity === 'light'
                        ? 'bg-pink-200 text-foreground'
                        : intensity === 'medium'
                        ? 'bg-pink-400 text-white'
                        : 'bg-pink-600 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                </button>
              ))}
            </div>
            <Button onClick={handleSaveEntry} className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300">
              Save Entry
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
