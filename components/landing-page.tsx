'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Heart, BookOpen, MessageCircle, Pill, TrendingUp, Sparkles } from 'lucide-react';

export function LandingPage() {
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Period Tracking',
      description: 'Track your cycle, flow intensity, and receive predictions for your next period.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Mood Tracking',
      description: 'Monitor your mood and energy levels to understand patterns in your emotional wellbeing.',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Health Resources',
      description: 'Access curated articles and guides for women\'s health, nutrition, and wellness.',
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Community Forum',
      description: 'Connect anonymously with others to share experiences and support each other.',
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: 'Symptom Checker',
      description: 'Get educational insights about your symptoms and helpful recommendations.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Health Insights',
      description: 'Understand correlations between your cycle, mood, and overall wellness.',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section with Meditation Illustration */}
      <section className="relative overflow-hidden py-12 md:py-24">
        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/30 rounded-full filter blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-5 w-40 h-40 bg-primary/20 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-secondary/25 rounded-full filter blur-2xl animate-bounce-soft" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent animate-spin-slow" />
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Your Wellness Journey Starts Here</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
                  Find balance in your life with
                  <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    clarity
                  </span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Track your cycle, understand your mood, and connect with a supportive community. Your personal health companion that truly understands you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/tracker" className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    Start Tracking
                  </Button>
                </Link>
                <Link href="/resources" className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto hover:bg-accent/10 hover:scale-105 transition-all duration-300">
                    Explore Resources
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">100%</div>
                  <div className="text-sm text-muted-foreground">Anonymous</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>

            {/* Right side - Meditation illustration */}
            <div className="relative h-96 md:h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/8 to-secondary/10 rounded-3xl animate-pulse-glow" />
              <Image
                src="/meditation.jpg"
                alt="Woman meditating with wellness vibes"
                width={450}
                height={450}
                priority
                className="relative z-10 drop-shadow-2xl animate-float rounded-2xl"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(139, 92, 246, 0.25))',
                }}
              />

              {/* Decorative floating elements with staggered animations */}
              <div className="absolute top-8 right-12 text-5xl animate-float-rotate" style={{ animationDelay: '0s' }}>
                <span className="inline-block">💜</span>
              </div>
              <div className="absolute bottom-24 left-8 text-4xl animate-bounce-soft" style={{ animationDelay: '0.3s' }}>
                <span className="inline-block">✨</span>
              </div>
              <div className="absolute top-1/3 right-0 text-4xl animate-float" style={{ animationDelay: '1s' }}>
                <span className="inline-block">🌸</span>
              </div>
              <div className="absolute bottom-32 right-8 text-3xl animate-bounce-soft" style={{ animationDelay: '0.6s' }}>
                <span className="inline-block">💖</span>
              </div>
              <div className="absolute top-1/4 left-0 text-3xl animate-float-rotate" style={{ animationDelay: '1.5s' }}>
                <span className="inline-block">🌼</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Everything You Need to Thrive</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for your health and wellbeing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-xl hover:border-primary/40 transition-smooth duration-500 hover:-translate-y-2 border-primary/10 bg-gradient-to-br from-white via-primary/2 to-transparent animate-fade-in-up group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-primary mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg w-fit group-hover:animate-pulse-glow transition-all">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & CTA Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <Card className="p-8 md:p-16 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/10 border-primary/20 overflow-hidden relative animate-scale-up">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full filter blur-3xl -mr-20 -mt-20 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/15 rounded-full filter blur-3xl -mb-16 -ml-16 animate-float" />

            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-balance animate-fade-in-up">Join Your Wellness Community</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Thousands of women are already tracking their health, sharing their stories, and supporting each other. Your journey to better health starts today.
              </p>

              <div className="grid grid-cols-3 gap-4 py-8">
                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl font-bold text-primary animate-pulse">10K+</div>
                  <div className="text-sm text-muted-foreground">Community Members</div>
                </div>
                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="text-3xl font-bold text-accent animate-pulse">50K+</div>
                  <div className="text-sm text-muted-foreground">Cycles Tracked</div>
                </div>
                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="text-3xl font-bold text-secondary animate-pulse">1000+</div>
                  <div className="text-sm text-muted-foreground">Forum Discussions</div>
                </div>
              </div>

              <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <Link href="/tracker">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    Start Your Journey Now
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-accent fill-accent" />
              <p className="font-semibold text-lg">HerHealth Companion</p>
            </div>
            <p className="text-muted-foreground">Empowering women to understand and take control of their health</p>
            <p className="text-xs text-muted-foreground">Always consult with healthcare professionals for medical advice</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
