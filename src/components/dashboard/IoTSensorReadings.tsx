import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplets, Sprout } from 'lucide-react';
import type { SensorReading } from '@/types/index';

interface IoTSensorReadingsProps {
  readings: SensorReading[];
}

export const IoTSensorReadings = ({ readings }: IoTSensorReadingsProps) => {
  const getReading = (type: string) => {
    return readings.find((r) => r.reading_type === type);
  };

  const tempReading = getReading('temperature');
  const humidityReading = getReading('humidity');
  const moistureReading = getReading('soil_moisture');

  const sensors = [
    {
      icon: <Thermometer className="h-6 w-6 text-red-500" />,
      label: 'Temperature',
      value: tempReading ? `${Math.round(tempReading.value)}${tempReading.unit}` : 'N/A',
      status: tempReading && tempReading.value >= 20 && tempReading.value <= 30 ? 'normal' : 'alert',
      bg: 'bg-red-500/10',
    },
    {
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
      label: 'Humidity',
      value: humidityReading ? `${Math.round(humidityReading.value)}${humidityReading.unit}` : 'N/A',
      status: humidityReading && humidityReading.value >= 40 && humidityReading.value <= 70 ? 'normal' : 'alert',
      bg: 'bg-blue-500/10',
    },
    {
      icon: <Sprout className="h-6 w-6 text-green-500" />,
      label: 'Soil Moisture',
      value: moistureReading ? `${Math.round(moistureReading.value)}${moistureReading.unit}` : 'N/A',
      status: moistureReading && moistureReading.value >= 50 && moistureReading.value <= 80 ? 'normal' : 'alert',
      bg: 'bg-green-500/10',
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-serif font-bold text-primary mb-4">IoT Sensor Live Readings</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sensors.map((sensor, index) => (
          <Card key={index} className="shadow-md border-none hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${sensor.bg}`}>
                  {sensor.icon}
                </div>
                <div className={`w-3 h-3 rounded-full ${sensor.status === 'normal' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{sensor.label}</p>
              <p className="text-3xl font-bold font-serif text-primary">{sensor.value}</p>
              <div className="mt-4 h-8">
                {/* Simple sparkline placeholder */}
                <svg className="w-full h-full" viewBox="0 0 100 30">
                  <polyline
                    points="0,15 20,10 40,18 60,8 80,12 100,15"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
