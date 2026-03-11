import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { SensorReading } from '@/types/index';

interface SoilpHChartProps {
  readings: SensorReading[];
}

export const SoilpHChart = ({ readings }: SoilpHChartProps) => {
  const chartData = readings
    .map((r) => ({
      date: new Date(r.recorded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      pH: Number(r.value.toFixed(2)),
    }))
    .reverse();

  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-primary">Soil pH Trend (30 Days)</CardTitle>
        <p className="text-sm text-muted-foreground">Ideal range: 6.0 - 7.0</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                domain={[5, 8]}
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
              <ReferenceLine y={6.0} stroke="hsl(var(--secondary))" strokeDasharray="3 3" opacity={0.5} />
              <ReferenceLine y={7.0} stroke="hsl(var(--secondary))" strokeDasharray="3 3" opacity={0.5} />
              <Line
                type="monotone"
                dataKey="pH"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
