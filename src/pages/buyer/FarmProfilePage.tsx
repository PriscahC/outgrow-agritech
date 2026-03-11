import React, { useState } from 'react';
import BuyerLayout from '@/components/buyer/BuyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Calendar, 
  Sprout, 
  CheckCircle, 
  Wifi, 
  Thermometer, 
  Droplets, 
  Heart,
  MessageSquare
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

const FarmProfilePage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [pickup, setPickup] = useState('');
  const [message, setMessage] = useState('');

  // Dummy farm data
  const farm = {
    name: 'Wanjiku Farm',
    farmer: 'Priscah W.',
    location: 'Nakuru, Rift Valley',
    country: 'Kenya 🇰🇪',
    crop: 'Maize',
    variety: 'Duma 43',
    acreage: 3.2,
    harvestDate: 'July 18, 2025',
    daysRemaining: 34,
    soilPH: 6.4,
    soilMoisture: 68,
    plantingDate: 'Mar 3, 2025',
    lastDroneScan: 'Jun 20, 2025',
    expectedYield: 18,
    lastSeasonYield: 13,
    quality: 'B+',
    qualityColor: 'bg-green-500',
  };

  const yieldData = [
    { category: 'Expected', bags: 18 },
    { category: 'Last Season', bags: 13 },
    { category: 'Regional Avg', bags: 15 },
  ];

  const iotReadings = [
    { label: 'Temperature', value: '24°C', status: 'good', icon: Thermometer },
    { label: 'Humidity', value: '65%', status: 'good', icon: Droplets },
    { label: 'Soil Moisture', value: '68%', status: 'good', icon: Droplets },
  ];

  const handleMakeOffer = () => {
    if (!quantity || !price || !pickup) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Your offer has been sent to the farmer. You will be notified when they respond.');
    setQuantity('');
    setPrice('');
    setPickup('');
    setMessage('');
  };

  return (
    <BuyerLayout>
      <div className="p-4 md:p-6 space-y-6 pb-20 lg:pb-6">
        {/* Hero Card */}
        <Card className="shadow-lg border-none bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className="bg-secondary text-secondary-foreground">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    <Wifi className="h-3 w-3 mr-1" />
                    IoT Monitored
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                  {farm.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {farm.farmer} • {farm.location}, {farm.country}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Crop</p>
                    <p className="font-bold text-primary">{farm.crop}</p>
                    <p className="text-xs text-muted-foreground">{farm.variety}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Farm Size</p>
                    <p className="font-bold text-primary">{farm.acreage} acres</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Harvest Date</p>
                    <p className="font-bold text-primary">{farm.harvestDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Days Remaining</p>
                    <Badge className="bg-secondary text-secondary-foreground text-lg font-bold">
                      {farm.daysRemaining}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2" onClick={() => toast.info('Scroll down to make an offer')}>
                  <MessageSquare className="h-5 w-5" />
                  Make an Offer
                </Button>
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 gap-2" onClick={() => toast.success('Added to watchlist')}>
                  <Heart className="h-5 w-5" />
                  Add to Watchlist
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Farm Vitals */}
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Farm Vitals</CardTitle>
                <p className="text-sm text-muted-foreground">From Outgrow field visit</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Soil pH</p>
                    <p className="text-2xl font-bold text-primary">{farm.soilPH}</p>
                    <Badge className="bg-green-500 text-white text-xs mt-1">Optimal</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Soil Moisture</p>
                    <p className="text-2xl font-bold text-primary">{farm.soilMoisture}%</p>
                    <Progress value={farm.soilMoisture} className="h-2 mt-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Planting Date</p>
                    <p className="text-lg font-bold text-primary">{farm.plantingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Farm Size</p>
                    <p className="text-lg font-bold text-primary">{farm.acreage} acres</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Last Drone Scan</p>
                    <p className="text-lg font-bold text-primary">{farm.lastDroneScan}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Yield Information */}
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Yield Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Expected Yield</p>
                      <p className="text-4xl font-bold font-serif text-primary">{farm.expectedYield} bags</p>
                      <p className="text-xs text-muted-foreground">(90kg each)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Last Season</p>
                      <p className="text-2xl font-bold text-foreground">{farm.lastSeasonYield} bags</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Quality Grade</p>
                      <Badge className={`${farm.qualityColor} text-white text-lg px-3 py-1`}>
                        {farm.quality}
                      </Badge>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-semibold text-green-600">
                        +38% improvement vs last season
                      </p>
                    </div>
                  </div>

                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={yieldData}>
                        <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar dataKey="bags" fill="hsl(var(--secondary))" name="Bags (90kg)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* IoT Live Readings */}
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">IoT Live Readings</CardTitle>
                <p className="text-sm text-muted-foreground">Updated 5 minutes ago</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {iotReadings.map((reading, index) => {
                    const Icon = reading.icon;
                    return (
                      <div key={index} className="text-center p-4 rounded-xl bg-muted/50">
                        <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">{reading.label}</p>
                        <p className="text-2xl font-bold text-primary">{reading.value}</p>
                        <div className="mt-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mx-auto" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Drone Map Thumbnail */}
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Drone Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-gradient-to-br from-green-500/20 via-yellow-500/20 to-green-500/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-3 gap-2 p-4">
                    <div className="bg-green-500/30 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">Zone A</span>
                    </div>
                    <div className="bg-yellow-500/30 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">Zone B</span>
                    </div>
                    <div className="bg-green-500/30 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">Zone C</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  Note: Full interactive map available for Outgrow team use only
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Make an Offer Panel */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-none sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Make an Offer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="quantity">Quantity Needed (bags)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Max 18 bags"
                    max={18}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="price">Offered Price per Bag (KSh)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g. 3200"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="pickup">Pickup Preference</Label>
                  <Select value={pickup} onValueChange={setPickup}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farm">Farm Pickup</SelectItem>
                      <SelectItem value="buyer">Buyer Arranges</SelectItem>
                      <SelectItem value="outgrow">Outgrow Logistics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message to Farmer (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Any specific requirements or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <Button 
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={handleMakeOffer}
                >
                  Send Offer →
                </Button>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Your offer will be sent directly to the farmer. They typically respond within 24 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default FarmProfilePage;
