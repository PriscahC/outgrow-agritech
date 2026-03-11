import React from 'react';
import BuyerLayout from '@/components/buyer/BuyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sprout, ShoppingCart, CheckCircle, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuyerDashboardPage = () => {
  const stats = [
    { icon: Sprout, label: 'Farms Watched', value: '12', color: 'text-primary' },
    { icon: ShoppingCart, label: 'Active Offers', value: '3', color: 'text-secondary' },
    { icon: CheckCircle, label: 'Completed Purchases', value: '8', color: 'text-green-600' },
    { icon: Calendar, label: 'Upcoming Harvests', value: '5', subtitle: 'in next 30 days', color: 'text-blue-600' },
  ];

  const upcomingHarvests = [
    {
      farmName: 'Wanjiku Farm',
      farmerName: 'Priscah W.',
      location: 'Nakuru, Kenya',
      crop: 'Maize',
      variety: 'Duma 43',
      harvestDate: 'Jul 18',
      yield: '18 bags',
      quality: 'B+',
      qualityColor: 'bg-green-500',
    },
    {
      farmName: 'Okello Farm',
      farmerName: 'David O.',
      location: 'Gulu, Uganda',
      crop: 'Sorghum',
      variety: 'Standard',
      harvestDate: 'Jul 25',
      yield: '32 bags',
      quality: 'A',
      qualityColor: 'bg-green-600',
    },
    {
      farmName: 'Adaeze Farm',
      farmerName: 'Adaeze N.',
      location: 'Enugu, Nigeria',
      crop: 'Soybeans',
      variety: 'TGx',
      harvestDate: 'Aug 2',
      yield: '45 bags',
      quality: 'A-',
      qualityColor: 'bg-green-500',
    },
  ];

  const pricePulse = [
    { crop: 'Maize', price: 'KSh 3,100/bag', trend: 'up', icon: TrendingUp, color: 'text-green-600' },
    { crop: 'Sorghum', price: 'UGX 85,000/bag', trend: 'stable', icon: Minus, color: 'text-muted-foreground' },
    { crop: 'Soybeans', price: 'NGN 48,000/bag', trend: 'down', icon: TrendingDown, color: 'text-red-600' },
  ];

  return (
    <BuyerLayout>
      <div className="p-4 md:p-6 space-y-6 pb-20 lg:pb-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">
            Good morning, James 👋
          </h1>
          <p className="text-primary-foreground/90 text-lg">
            Here's what's ready for sourcing today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-md border-none">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`p-3 rounded-2xl bg-muted ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold font-serif text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                      {stat.subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Upcoming Harvests Feed */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Upcoming Harvests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingHarvests.map((harvest, index) => (
              <Card key={index} className="shadow-lg border-none hover:shadow-xl transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-primary">{harvest.farmName}</h3>
                      <p className="text-sm text-muted-foreground">{harvest.farmerName}</p>
                    </div>
                    <Badge className={`${harvest.qualityColor} text-white`}>
                      Grade {harvest.quality}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>📍</span>
                      <span>{harvest.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🌾</span>
                      <span className="font-semibold">
                        {harvest.crop} — {harvest.variety}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>📅</span>
                      <span>Harvest: {harvest.harvestDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>⚖️</span>
                      <span>{harvest.yield} available</span>
                    </div>
                  </div>

                  <Link to={`/buyer/farm/${index + 1}`}>
                    <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      <span>View Farm →</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Price Pulse */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Price Pulse</CardTitle>
            <p className="text-sm text-muted-foreground">Current market prices this week</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pricePulse.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div>
                      <p className="font-bold text-foreground">{item.crop}</p>
                      <p className="text-sm text-muted-foreground">{item.price}</p>
                    </div>
                    <Icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </BuyerLayout>
  );
};

export default BuyerDashboardPage;
