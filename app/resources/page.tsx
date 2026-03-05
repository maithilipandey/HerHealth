import { Navigation } from '@/components/navigation';
import { HealthResources } from '@/components/health-resources';

export const metadata = {
  title: 'Health Resources - HerHealth Companion',
  description: 'Educational content for women\'s health and wellness',
};

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <HealthResources />
      </main>
    </>
  );
}
