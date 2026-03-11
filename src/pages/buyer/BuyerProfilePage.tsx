import React, { useState } from 'react';
import BuyerLayout from '@/components/buyer/BuyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building2, Mail, Phone, MapPin, Sprout, CheckCircle, Edit } from 'lucide-react';
import { toast } from 'sonner';

const BuyerProfilePage = () => {
  const [notificationPrefs, setNotificationPrefs] = useState({
    harvestAlerts: true,
    newListings: true,
    priceUpdates: false,
  });

  const profile = {
    name: 'James Kariuki',
    company: 'Unga Group Ltd',
    email: 'james.kariuki@ungagroup.com',
    phone: '+254 712 345 678',
    country: 'Kenya 🇰🇪',
    cropInterests: ['Maize', 'Sorghum', 'Soybeans'],
    verified: true,
  };

  const handleToggleNotification = (key: keyof typeof notificationPrefs) => {
    setNotificationPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success('Notification preferences updated');
  };

  return (
    <BuyerLayout>
      <div className="p-4 md:p-6 space-y-6 pb-20 lg:pb-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Buyer Profile</h1>
          <p className="text-muted-foreground text-lg">Manage your account and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-serif text-primary">Profile Information</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => console.log('Edit profile')}>
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar and Name */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 bg-primary text-primary-foreground text-2xl">
                    <AvatarFallback>JK</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold text-primary">{profile.name}</h2>
                      {profile.verified && (
                        <Badge className="bg-secondary text-secondary-foreground">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified Buyer
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{profile.company}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Company
                    </Label>
                    <Input value={profile.company} disabled className="mt-2" />
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input value={profile.email} disabled className="mt-2" />
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </Label>
                    <Input value={profile.phone} disabled className="mt-2" />
                  </div>

                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Country
                    </Label>
                    <Input value={profile.country} disabled className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Crop Interests */}
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-secondary" />
                  Crop Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.cropInterests.map((crop, index) => (
                    <Badge key={index} className="bg-secondary text-secondary-foreground text-sm px-3 py-1">
                      {crop}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => console.log('Edit interests')}>
                  Edit Interests
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Notification Preferences */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">Harvest Alerts</p>
                    <p className="text-xs text-muted-foreground">Get notified when farms are ready</p>
                  </div>
                  <Switch
                    checked={notificationPrefs.harvestAlerts}
                    onCheckedChange={() => handleToggleNotification('harvestAlerts')}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">New Farm Listings</p>
                    <p className="text-xs text-muted-foreground">New farms matching your interests</p>
                  </div>
                  <Switch
                    checked={notificationPrefs.newListings}
                    onCheckedChange={() => handleToggleNotification('newListings')}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">Price Updates</p>
                    <p className="text-xs text-muted-foreground">Market price changes</p>
                  </div>
                  <Switch
                    checked={notificationPrefs.priceUpdates}
                    onCheckedChange={() => handleToggleNotification('priceUpdates')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card className="shadow-lg border-none mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-bold text-primary">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Purchases</span>
                  <span className="font-bold text-primary">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Offers</span>
                  <span className="font-bold text-primary">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Farms Watched</span>
                  <span className="font-bold text-primary">12</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default BuyerProfilePage;
