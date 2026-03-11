import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, TrendingUp, CheckCircle, MessageSquare, Building2 } from 'lucide-react';

const MarketAccessPage = () => {
  const cropSummary = {
    crop: 'Maize',
    expected: '18 bags',
    harvest: '~Jul 18',
    quality: 'B+',
    status: 'Harvest Approaching — Buyers Notified',
  };

  const buyerOffers = [
    {
      company: 'Unga Group',
      location: 'Nairobi',
      price: 3200,
      volume: '10 bags',
      pickup: 'They collect from farm',
    },
    {
      company: 'Githunguri Dairy & Feeds',
      location: 'Kiambu',
      price: 3050,
      volume: '18 bags',
      pickup: 'They collect from farm',
    },
    {
      company: 'Outgrow Aggregator',
      location: 'Nakuru (closest)',
      price: 3100,
      volume: 'Any quantity',
      pickup: 'They collect from farm',
    },
  ];

  const priceTracker = {
    current: 3100,
    lastWeek: 2980,
    trend: 'up',
    change: 4,
  };

  const pastSales = [
    {
      date: 'Oct 2024',
      quantity: '12 bags',
      price: 2750,
      buyer: 'Unga Group',
      status: 'Paid',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Market Access</h1>
          <p className="text-muted-foreground text-lg">Your crop is ready — here's who wants to buy it.</p>
        </div>

        {/* Crop Summary Card */}
        <Card className="shadow-lg border-none bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Crop</p>
                <p className="text-xl font-bold text-primary">{cropSummary.crop}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Expected</p>
                <p className="text-xl font-bold text-primary">{cropSummary.expected}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Harvest</p>
                <p className="text-xl font-bold text-primary">{cropSummary.harvest}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Quality Grade</p>
                <Badge className="bg-secondary text-secondary-foreground text-lg font-bold px-3 py-1">
                  {cropSummary.quality}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge className="bg-yellow-500 text-white text-sm">🟡 {cropSummary.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buyer Offers */}
        <div>
          <h3 className="text-xl font-serif font-bold text-primary mb-4">Buyer Offers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyerOffers.map((offer, index) => (
              <Card key={index} className="shadow-lg border-none hover:shadow-xl transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-primary">{offer.company}</h4>
                      <p className="text-sm text-muted-foreground">{offer.location}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">Offer Price</span>
                      <span className="text-2xl font-bold font-serif text-secondary">
                        KSh {offer.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Volume Needed</span>
                      <span className="font-semibold">{offer.volume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pickup</span>
                      <span className="font-semibold text-sm">{offer.pickup}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => console.log('Accept offer')}>
                      ✅ Accept
                    </Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/5" onClick={() => console.log('Ask question')}>
                      💬 Ask
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Price Tracker */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Current Price Tracker
            </CardTitle>
            <p className="text-sm text-muted-foreground">Maize prices in Nakuru this week</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-secondary/10 rounded-2xl">
                <p className="text-sm text-muted-foreground mb-2">Market Price</p>
                <p className="text-4xl font-bold font-serif text-secondary">
                  KSh {priceTracker.current.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">per bag</p>
              </div>
              <div className="text-center p-6 bg-muted rounded-2xl">
                <p className="text-sm text-muted-foreground mb-2">Last Week</p>
                <p className="text-3xl font-bold text-foreground">KSh {priceTracker.lastWeek.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">per bag</p>
              </div>
              <div className="text-center p-6 bg-green-500/10 rounded-2xl">
                <p className="text-sm text-muted-foreground mb-2">Trend</p>
                <p className="text-3xl font-bold text-green-600">↑ Up {priceTracker.change}%</p>
                <p className="text-xs text-green-600 mt-1 font-semibold">Good time to sell</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Past Sales */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Past Sales</CardTitle>
          </CardHeader>
          <CardContent>
            {pastSales.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No past sales yet. Your first sale will appear here!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pastSales.map((sale, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-muted/50"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-sm font-semibold text-muted-foreground min-w-[80px]">{sale.date}</span>
                      <div className="flex-1">
                        <p className="font-bold text-foreground">
                          {sale.quantity} @ KSh {sale.price.toLocaleString()}/bag
                        </p>
                        <p className="text-sm text-muted-foreground">{sale.buyer}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white flex items-center gap-1 w-fit">
                      <CheckCircle className="h-4 w-4" />
                      {sale.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MarketAccessPage;
