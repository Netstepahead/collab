'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/types/questionnaire';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  value: number | undefined;
  onChange: (value: number) => void;
  scaleLabels: Record<string, string>;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  value,
  onChange,
  scaleLabels
}: QuestionCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <CardTitle className="text-xl">{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={value?.toString()}
          onValueChange={(val) => onChange(parseInt(val))}
          className="space-y-3"
        >
          {[1, 2, 3, 4, 5].map((score) => (
            <div
              key={score}
              className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
            >
              <RadioGroupItem value={score.toString()} id={`q${question.id}-${score}`} />
              <Label
                htmlFor={`q${question.id}-${score}`}
                className="flex-1 cursor-pointer font-normal"
              >
                <span className="font-medium">{score}</span> - {scaleLabels[score]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
