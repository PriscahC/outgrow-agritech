import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cloud, CloudRain, Sun, CloudDrizzle } from 'lucide-react';
import { getWeather } from '@/db/api';
import type { WeatherData } from '@/types/index';

interface WelcomeBannerProps {
  farmerName: string | null;
  latitude: number | null;
  longitude: number | null;
}

export const WelcomeBanner = ({ farmerName, latitude, longitude }: WelcomeBannerProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      if (latitude && longitude) {
        const data = await getWeather(latitude, longitude);
        setWeather(data);
      }
      setLoading(false);
    };

    fetchWeather();
  }, [latitude, longitude]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain?.toLowerCase()) {
      case 'rain':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'drizzle':
        return <CloudDrizzle className="h-8 w-8 text-blue-400" />;
      case 'clouds':
        return <Cloud className="h-8 w-8 text-gray-400" />;
      case 'clear':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />;
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none shadow-lg overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">
              {getGreeting()}, {farmerName || 'Farmer'} 🌱
            </h1>
            <p className="text-primary-foreground/80 text-sm md:text-base">{today}</p>
          </div>

          {loading ? (
            <div className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="animate-pulse flex items-center gap-4">
                <div className="h-12 w-12 bg-primary-foreground/20 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-primary-foreground/20 rounded" />
                  <div className="h-3 w-32 bg-primary-foreground/20 rounded" />
                </div>
              </div>
            </div>
          ) : weather ? (
            <div className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4 min-w-[200px]">
              <div className="flex-shrink-0">
                {getWeatherIcon(weather.current.weather[0]?.main)}
              </div>
              <div>
                <div className="text-3xl font-bold">{Math.round(weather.current.temp)}°C</div>
                <div className="text-sm text-primary-foreground/80 capitalize">
                  {weather.current.weather[0]?.description || 'Clear'}
                </div>
                {weather.daily[0] && (
                  <div className="text-xs text-primary-foreground/60 mt-1">
                    Rain: {Math.round(weather.daily[0].pop * 100)}%
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4">
              <Cloud className="h-8 w-8 text-primary-foreground/60" />
              <div>
                <div className="text-sm text-primary-foreground/80">Weather unavailable</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
