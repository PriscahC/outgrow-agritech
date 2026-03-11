import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FarmHealthScoreProps {
  score: number;
}

export const FarmHealthScore = ({ score }: FarmHealthScoreProps) => {
  const getColor = (score: number) => {
    if (score >= 71) return { stroke: 'hsl(var(--secondary))', text: 'text-secondary', bg: 'bg-secondary/10' };
    if (score >= 41) return { stroke: '#D4A017', text: 'text-[#D4A017]', bg: 'bg-[#D4A017]/10' };
    return { stroke: '#ef4444', text: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const color = getColor(score);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-primary">Farm Health Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-8">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke={color.stroke}
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold font-serif ${color.text}`}>{score}</span>
            <span className="text-sm text-muted-foreground font-medium">out of 100</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 w-full">
          <div className={`text-center p-3 rounded-xl ${color.bg}`}>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Soil Health</p>
            <p className={`text-lg font-bold ${color.text}`}>Good</p>
          </div>
          <div className={`text-center p-3 rounded-xl ${color.bg}`}>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Moisture</p>
            <p className={`text-lg font-bold ${color.text}`}>Optimal</p>
          </div>
          <div className={`text-center p-3 rounded-xl ${color.bg}`}>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Pest Risk</p>
            <p className={`text-lg font-bold ${color.text}`}>Low</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
