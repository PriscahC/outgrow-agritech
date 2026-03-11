import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { YieldData } from '@/types/index';

interface YieldForecastChartProps {
  yieldData: YieldData[];
}

export const YieldForecastChart = ({ yieldData }: YieldForecastChartProps) => {
  const chartData = yieldData.map((y) => ({
    season: y.season,
    expected: y.expected_yield_kg || 0,
    actual: y.actual_yield_kg || 0,
    regional: y.regional_average_kg || 0,
  })).reverse();

  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-primary">Yield Forecast</CardTitle>
        <p className="text-sm text-muted-foreground">Comparison across seasons (kg)</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="season"
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="expected" fill="hsl(var(--secondary))" name="Expected Yield" radius={[8, 8, 0, 0]} />
              <Bar dataKey="actual" fill="hsl(var(--primary))" name="Actual Yield" radius={[8, 8, 0, 0]} />
              <Bar dataKey="regional" fill="hsl(var(--muted))" name="Regional Average" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
