'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Pill, AlertCircle } from 'lucide-react';

const SYMPTOMS = [
  'Cramps',
  'Headache',
  'Bloating',
  'Fatigue',
  'Mood changes',
  'Nausea',
  'Back pain',
  'Breast tenderness',
  'Anxiety',
  'Depression',
  'Insomnia',
  'Acne',
];

interface SymptomResponse {
  symptoms: string[];
  advice: string;
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  disclaimer: string;
}

export function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<SymptomResponse | null>(null);

  function toggleSymptom(symptom: string) {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  }

  function analyzeSymptoms() {
    if (selectedSymptoms.length === 0) {
      return;
    }

    // Mock AI response based on selected symptoms
    const symptomCount = selectedSymptoms.length;
    let severity: 'mild' | 'moderate' | 'severe' = 'mild';
    let advice = '';
    let recommendations: string[] = [];

    if (symptomCount <= 2) {
      severity = 'mild';
      advice = 'Your symptoms appear to be mild. Most symptoms related to the menstrual cycle are normal and can be managed with simple lifestyle adjustments.';
      recommendations = [
        'Stay hydrated - aim for 8-10 glasses of water daily',
        'Get regular exercise, even light walks can help',
        'Practice relaxation techniques like deep breathing or meditation',
        'Ensure adequate sleep (7-9 hours per night)',
      ];
    } else if (symptomCount <= 5) {
      severity = 'moderate';
      advice = 'You have reported several symptoms that are commonly associated with the menstrual cycle. These are typically manageable with proper care and attention to your health.';
      recommendations = [
        'Track your symptoms to identify patterns related to your cycle',
        'Consider over-the-counter pain relievers like ibuprofen for cramps',
        'Increase magnesium intake (nuts, seeds, leafy greens)',
        'Reduce caffeine intake which may worsen some symptoms',
        'Engage in gentle yoga or stretching exercises',
        'Apply heat therapy for cramps (heating pad or warm bath)',
      ];
    } else {
      severity = 'severe';
      advice = 'You have reported multiple symptoms that may significantly impact your quality of life. Please consider consulting with a healthcare provider for personalized advice.';
      recommendations = [
        'Schedule an appointment with your gynecologist or primary care doctor',
        'Keep a detailed symptom diary to share with your healthcare provider',
        'Consider medical treatments for severe symptoms (your doctor can advise)',
        'Join support communities for others experiencing similar symptoms',
        'Explore therapies like CBT (Cognitive Behavioral Therapy) for mood symptoms',
        'Discuss hormonal options with your doctor if symptoms are severe',
      ];
    }

    setResult({
      symptoms: selectedSymptoms,
      advice,
      severity,
      recommendations,
      disclaimer: 'This is a mock symptom checker for educational purposes only. It is not a substitute for professional medical advice. Always consult with a healthcare provider for diagnosis and treatment recommendations.',
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">AI Symptom Checker</h2>
        <p className="text-muted-foreground">Get insights about your symptoms (for educational purposes)</p>
      </div>

      {!result ? (
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            Select Your Symptoms
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {SYMPTOMS.map(symptom => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                  selectedSymptoms.includes(symptom)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-background hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => {}}
                    className="w-5 h-5"
                  />
                  <span>{symptom}</span>
                </div>
              </button>
            ))}
          </div>

          <Alert className="mb-6 border-accent/20 bg-accent/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This symptom checker is for educational purposes only. Please consult with a healthcare provider for proper diagnosis and treatment.
            </AlertDescription>
          </Alert>

          <Button
            onClick={analyzeSymptoms}
            disabled={selectedSymptoms.length === 0}
            size="lg"
            className="w-full"
          >
            Analyze Symptoms
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => {
              setResult(null);
              setSelectedSymptoms([]);
            }}
            className="mb-4"
          >
            ← Start Over
          </Button>

          <Card className={`p-6 border-2 ${
            result.severity === 'severe'
              ? 'border-destructive/50 bg-destructive/5'
              : result.severity === 'moderate'
              ? 'border-accent/50 bg-accent/5'
              : 'border-primary/50 bg-primary/5'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-4 h-4 rounded-full ${
                result.severity === 'severe'
                  ? 'bg-destructive'
                  : result.severity === 'moderate'
                  ? 'bg-accent'
                  : 'bg-primary'
              }`} />
              <h3 className="font-semibold text-lg capitalize">{result.severity} Symptoms</h3>
            </div>
            <p className="text-foreground mb-4">{result.advice}</p>
            <p className="text-sm font-semibold text-muted-foreground mb-4">Symptoms reported: {result.symptoms.join(', ')}</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Recommendations</h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-bold text-primary flex-shrink-0">{i + 1}.</span>
                  <span className="text-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Alert className="border-accent/20 bg-accent/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {result.disclaimer}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
