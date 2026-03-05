import { Navigation } from '@/components/navigation';
import { LandingPage } from '@/components/landing-page';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 relative overflow-hidden">

      <Navigation />

      {/* Animated background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-40 animate-float"></div>

      <div className="absolute top-40 right-0 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-40 animate-float"></div>

      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-rose-300 rounded-full blur-3xl opacity-40 animate-float"></div>

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">

        {/* Animated container */}
        <div className="animate-fade-in-up">
          <LandingPage />
        </div>

        {/* Floating decorative elements */}
        <div className="fixed top-24 left-10 text-pink-400 text-5xl animate-float">
          💖
        </div>

        <div className="fixed bottom-24 right-10 text-purple-400 text-5xl animate-float">
          🌸
        </div>

        <div className="fixed top-1/2 right-20 text-rose-400 text-4xl animate-bounce-soft">
          💕
        </div>

        <div className="fixed bottom-40 left-24 text-pink-300 text-3xl animate-heartbeat">
          💗
        </div>

        <div className="fixed top-40 right-40 text-fuchsia-300 text-3xl animate-spin-slow">
          ✨
        </div>

      </div>

    </main>
  );
}