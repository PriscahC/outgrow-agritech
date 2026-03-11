import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, MapPin, Sprout, Wifi, Drone, Building2, Edit, CheckCircle } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const farmerProfile = {
    name: 'Priscah Wanjiku',
    phone: '+254 712 xxx xxx',
    email: 'priscah_1@miaoda.com',
    country: 'Kenya 🇰🇪',
    memberSince: 'January 2025',
  };

  const farmDetails = {
    farmName: 'Wanjiku Farm',
    location: 'Nakuru, Rift Valley',
    acreage: 3.2,
    primaryCrop: 'Maize',
    iotSensors: 3,
    lastDroneScan: 'June 20, 2025',
  };

  const bankAccount = {
    bank: 'Equity Bank',
    account: '••••4521',
    status: 'Verified',
  };

  const [notifications, setNotifications] = useState({
    marketPrices: true,
    harvestReminders: true,
    pestWarnings: true,
    loanReminders: true,
    weatherAlerts: true,
  });

  const [language, setLanguage] = useState('english');

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Profile</h1>
          <p className="text-muted-foreground text-lg">Your farm, your details.</p>
        </div>

        {/* Farmer Profile Card */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-serif text-primary">Farmer Profile</CardTitle>
              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 border-4 border-secondary">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-3xl font-bold">
                    P
                  </AvatarFallback>
                </Avatar>
                <Badge className="bg-primary text-primary-foreground">
                  Member since {farmerProfile.memberSince}
                </Badge>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm text-muted-foreground mb-1">
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input id="name" defaultValue={farmerProfile.name} className="mt-1" />
                    ) : (
                      <p className="text-lg font-semibold text-foreground">{farmerProfile.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm text-muted-foreground mb-1">
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input id="phone" defaultValue={farmerProfile.phone} className="mt-1" />
                    ) : (
                      <p className="text-lg font-semibold text-foreground">{farmerProfile.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm text-muted-foreground mb-1">
                      Email
                    </Label>
                    {isEditing ? (
                      <Input id="email" defaultValue={farmerProfile.email} className="mt-1" />
                    ) : (
                      <p className="text-lg font-semibold text-foreground">{farmerProfile.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-sm text-muted-foreground mb-1">
                      Country
                    </Label>
                    <p className="text-lg font-semibold text-foreground">{farmerProfile.country}</p>
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4 border-t">
                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => setIsEditing(false)}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Farm Details */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
              <Sprout className="h-5 w-5 text-secondary" />
              Farm Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Farm Name</p>
                  <p className="text-lg font-semibold text-foreground">{farmDetails.farmName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="text-lg font-semibold text-foreground">{farmDetails.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sprout className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Acreage</p>
                  <p className="text-lg font-semibold text-foreground">{farmDetails.acreage} acres</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Sprout className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Primary Crop</p>
                  <p className="text-lg font-semibold text-foreground">{farmDetails.primaryCrop}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Wifi className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">IoT Sensors Installed</p>
                  <p className="text-lg font-semibold text-foreground">{farmDetails.iotSensors}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Drone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Last Drone Scan</p>
                  <p className="text-lg font-semibold text-foreground">{farmDetails.lastDroneScan}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Linked Bank Account */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
              <Building2 className="h-5 w-5 text-secondary" />
              Linked Bank Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{bankAccount.bank}</p>
                  <p className="text-2xl font-mono font-semibold text-muted-foreground tracking-wider">
                    {bankAccount.account}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Badge className="bg-green-500 text-white">{bankAccount.status}</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5" onClick={() => console.log('Update bank details')}>
                Update Bank Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SMS Notification Preferences */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">SMS Notification Preferences</CardTitle>
            <p className="text-sm text-muted-foreground">Choose what alerts you want to receive via SMS</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-semibold text-foreground">Market Price Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when crop prices change</p>
                </div>
                <Switch
                  checked={notifications.marketPrices}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketPrices: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-semibold text-foreground">Harvest Reminders</p>
                  <p className="text-sm text-muted-foreground">Reminders when harvest time approaches</p>
                </div>
                <Switch
                  checked={notifications.harvestReminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, harvestReminders: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-semibold text-foreground">Pest & Disease Warnings</p>
                  <p className="text-sm text-muted-foreground">Urgent alerts about crop threats</p>
                </div>
                <Switch
                  checked={notifications.pestWarnings}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pestWarnings: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-semibold text-foreground">Loan Repayment Reminders</p>
                  <p className="text-sm text-muted-foreground">Reminders for upcoming loan payments</p>
                </div>
                <Switch
                  checked={notifications.loanReminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, loanReminders: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-semibold text-foreground">Weather Alerts</p>
                  <p className="text-sm text-muted-foreground">Important weather updates for your area</p>
                </div>
                <Switch
                  checked={notifications.weatherAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weatherAlerts: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Preference */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Language Preference</CardTitle>
            <p className="text-sm text-muted-foreground">Choose your preferred language for the app</p>
          </CardHeader>
          <CardContent>
            <div className="max-w-xs">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="swahili">Swahili</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
