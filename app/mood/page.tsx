import { Navigation } from '@/components/navigation';
import { MoodTracker } from '@/components/mood-tracker';

export const metadata = {
  title: 'Mood Tracker - HerHealth Companion',
  description: 'Track your mood and energy levels daily',
};

export default function MoodPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <MoodTracker />
      </main>
    </>
  );
}
