'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Heart, Brain, Pill } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'wellness' | 'mental-health' | 'nutrition' | 'fitness';
  icon: React.ReactNode;
  link?: string;
}

const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Understanding Your Menstrual Cycle',
    description: 'A comprehensive guide to the phases of your menstrual cycle and what to expect during each phase.',
    category: 'wellness',
    icon: <Heart className="w-6 h-6" />,
    link: '#',
  },
  {
    id: '2',
    title: 'Mindfulness for Hormonal Balance',
    description: 'Learn meditation and breathing techniques to manage hormonal fluctuations and stress.',
    category: 'mental-health',
    icon: <Brain className="w-6 h-6" />,
    link: '#',
  },
  {
    id: '3',
    title: 'Nutrition for Women\'s Health',
    description: 'Discover how to optimize your diet based on your cycle to feel your best every day.',
    category: 'nutrition',
    icon: <Pill className="w-6 h-6" />,
    link: '#',
  },
  {
    id: '4',
    title: 'Exercise Tips for Every Phase',
    description: 'Find the right workout intensity and type for each phase of your menstrual cycle.',
    category: 'fitness',
    icon: <Heart className="w-6 h-6" />,
    link: '#',
  },
  {
    id: '5',
    title: 'Managing PMS Symptoms',
    description: 'Evidence-based strategies to reduce PMS symptoms and improve your quality of life.',
    category: 'wellness',
    icon: <BookOpen className="w-6 h-6" />,
    link: '#',
  },
  {
    id: '6',
    title: 'Mental Health & Menstruation',
    description: 'Understanding the connection between your cycle and mood, and how to support your mental wellbeing.',
    category: 'mental-health',
    icon: <Brain className="w-6 h-6" />,
    link: '#',
  },
];

export function HealthResources() {
  const categories = [
    { value: 'wellness', label: 'Wellness' },
    { value: 'mental-health', label: 'Mental Health' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'fitness', label: 'Fitness' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Health Resources</h2>
        <p className="text-muted-foreground">Educational content to support your health journey</p>
      </div>

      <div className="grid gap-4">
        {RESOURCES.map(resource => (
          <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
              <div className="text-primary flex-shrink-0">
                {resource.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {categories.find(c => c.value === resource.category)?.label}
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                    Read More →
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <h3 className="font-semibold text-lg mb-2">Did you know?</h3>
        <p className="text-muted-foreground mb-4">
          Tracking your menstrual cycle can help you understand your body better and optimize your health, fitness, and nutrition throughout the month. Many women find that syncing their activities with their cycle phases leads to better results and improved wellbeing.
        </p>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Learn More About Cycle Syncing
        </Button>
      </Card>
    </div>
  );
}
