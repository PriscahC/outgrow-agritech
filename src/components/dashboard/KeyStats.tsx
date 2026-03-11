import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sprout, Ruler, Calendar, Droplets } from 'lucide-react';

interface KeyStatsProps {
  currentCrop: string | null;
  farmSize: number | null;
  daysToHarvest: number | null;
  soilMoisture: number | null;
}

export const KeyStats = ({ currentCrop, farmSize, daysToHarvest, soilMoisture }: KeyStatsProps) => {
  const stats = [
    {
      icon: <Sprout className="h-6 w-6 text-secondary" />,
      label: 'Current Crop',
      value: currentCrop || 'N/A',
      bg: 'bg-secondary/10',
    },
    {
      icon: <Ruler className="h-6 w-6 text-primary" />,
      label: 'Farm Size',
      value: farmSize ? `${farmSize} acres` : 'N/A',
      bg: 'bg-primary/10',
    },
    {
      icon: <Calendar className="h-6 w-6 text-secondary" />,
      label: 'Days to Harvest',
      value: daysToHarvest ? `${daysToHarvest} days` : 'N/A',
      bg: 'bg-secondary/10',
    },
    {
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
      label: 'Soil Moisture',
      value: soilMoisture ? `${soilMoisture}%` : 'N/A',
      bg: 'bg-blue-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-md border-none hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <div className={`p-3 rounded-2xl ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-xl md:text-2xl font-bold font-serif text-primary">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
