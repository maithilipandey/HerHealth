import { Navigation } from '@/components/navigation';
import { SymptomChecker } from '@/components/symptom-checker';

export const metadata = {
  title: 'Symptom Checker - HerHealth Companion',
  description: 'Get educational insights about your symptoms',
};

export default function SymptomCheckerPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <SymptomChecker />
      </main>
    </>
  );
}
