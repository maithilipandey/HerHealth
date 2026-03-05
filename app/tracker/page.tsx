import { Navigation } from '@/components/navigation';
import { PeriodTracker } from '@/components/period-tracker';

export const metadata = {
  title: 'Period Tracker - HerHealth Companion',
  description: 'Track your menstrual cycle, flow intensity, and receive predictions',
};

export default function TrackerPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <PeriodTracker />
      </main>
    </>
  );
}
