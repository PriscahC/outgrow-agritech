import React from 'react';
import BuyerLayout from '@/components/buyer/BuyerLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Sprout, MapPin, Calendar, Scale, X, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = React.useState([
    {
      id: 1,
      name: 'Wanjiku Farm',
      farmer: 'Priscah W.',
      location: 'Nakuru, Kenya',
      crop: 'Maize',
      variety: 'Duma 43',
      harvestDate: 'Jul 18',
      quantity: '18 bags',
      quality: 'B+',
      qualityColor: 'bg-green-500',
      alertEnabled: true,
    },
    {
      id: 2,
      name: 'Okello Farm',
      farmer: 'David O.',
      location: 'Gulu, Uganda',
      crop: 'Sorghum',
      variety: 'Standard',
      harvestDate: 'Jul 25',
      quantity: '32 bags',
      quality: 'A',
      qualityColor: 'bg-green-600',
      alertEnabled: true,
    },
    {
      id: 5,
      name: 'Phiri Farm',
      farmer: 'Thandiwe P.',
      location: 'Lilongwe, Malawi',
      crop: 'Groundnuts',
      variety: 'CG7',
      harvestDate: 'Aug 15',
      quantity: '28 bags',
      quality: 'A',
      qualityColor: 'bg-green-600',
      alertEnabled: false,
    },
  ]);

  const handleRemove = (id: number) => {
    setWatchlist(watchlist.filter((farm) => farm.id !== id));
    toast.success('Farm removed from watchlist');
  };

  const handleToggleAlert = (id: number) => {
    setWatchlist(
      watchlist.map((farm) =>
        farm.id === id ? { ...farm, alertEnabled: !farm.alertEnabled } : farm
      )
    );
  };

  return (
    <BuyerLayout>
      <div className="p-4 md:p-6 space-y-6 pb-20 lg:pb-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">My Watchlist</h1>
          <p className="text-muted-foreground text-lg">Farms you're keeping an eye on.</p>
        </div>

        {/* Watchlist Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {watchlist.length} {watchlist.length === 1 ? 'farm' : 'farms'} in your watchlist
          </p>
        </div>

        {/* Farm Cards Grid */}
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((farm) => (
              <Card key={farm.id} className="shadow-lg border-none hover:shadow-xl transition-shadow">
                <CardContent className="p-6 space-y-4">
                  {/* Farm Photo Placeholder */}
                  <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center relative">
                    <Sprout className="h-16 w-16 text-primary/40" />
                    <button
                      className="absolute top-2 right-2 p-2 bg-card rounded-full shadow-md hover:bg-muted transition-colors"
                      onClick={() => handleRemove(farm.id)}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Farm Info */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-primary">{farm.name}</h3>
                        <p className="text-sm text-muted-foreground">{farm.farmer}</p>
                      </div>
                      <Badge className={`${farm.qualityColor} text-white`}>
                        {farm.quality}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{farm.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sprout className="h-4 w-4 text-primary" />
                        <span className="font-semibold">
                          {farm.crop} — {farm.variety}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Harvest: {farm.harvestDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Scale className="h-4 w-4" />
                        <span>{farm.quantity} available</span>
                      </div>
                    </div>

                    {/* Harvest Alert Toggle */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 mt-3">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Harvest Alert</span>
                      </div>
                      <Switch
                        checked={farm.alertEnabled}
                        onCheckedChange={() => handleToggleAlert(farm.id)}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link to={`/buyer/farm/${farm.id}`}>
                    <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      <span>View Farm →</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Sprout className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">No farms in watchlist</h3>
            <p className="text-muted-foreground mb-4">Start adding farms to keep track of them</p>
            <Link to="/buyer/browse">
              <Button asChild>
                <span>Browse Farms</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </BuyerLayout>
  );
};

export default WatchlistPage;
