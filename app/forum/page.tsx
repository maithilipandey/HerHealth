import { Navigation } from '@/components/navigation';
import { Forum } from '@/components/forum';

export const metadata = {
  title: 'Community Forum - HerHealth Companion',
  description: 'Connect anonymously with other women in our community forum',
};

export default function ForumPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Forum />
      </main>
    </>
  );
}
