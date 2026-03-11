import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Construction, Edit, Sprout, CheckCircle, Radio, AlertTriangle, Calendar, MapPin, Lock, LogOut } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  role?: 'admin' | 'field_agent';
}

const PlaceholderPage = ({ title, description, role = 'admin' }: PlaceholderPageProps) => {
  return (
    <AdminLayout role={role}>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">{title}</h1>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>

        <Card className="shadow-lg border-none">
          <CardContent className="p-12 text-center">
            <Construction className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Page Under Construction</h3>
            <p className="text-muted-foreground">
              This page is being built. Core functionality will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export const FarmerAccountsPage = () => (
  <PlaceholderPage
    title="Farmer Accounts"
    description="Manage all farmer accounts and profiles"
  />
);

export const BuyerAccountsPage = () => (
  <PlaceholderPage
    title="Buyer Accounts"
    description="Manage buyer accounts and verification"
  />
);

export const ExtensionServicesPage = () => (
  <PlaceholderPage
    title="Extension Services"
    description="Assign agronomists, schedule visits, and log recommendations"
  />
);

export const AnalyticsPage = () => (
  <PlaceholderPage
    title="Analytics"
    description="Platform performance and insights"
  />
);

export const SettingsPage = () => (
  <PlaceholderPage
    title="Settings"
    description="Platform configuration and management"
  />
);

export const AdminProfilePage = () => {
  const upcomingVisits = [
    { farm: 'Wanjiku Farm', location: 'Nakuru', visitType: 'IoT Check', dateTime: 'Jul 2, 9:00 AM' },
    { farm: 'Kariuki Farm', location: 'Subukia', visitType: 'Onboarding', dateTime: 'Jul 3, 11:00 AM' },
    { farm: 'Njoroge Farm', location: 'Molo', visitType: 'Drone Scan', dateTime: 'Jul 5, 8:30 AM' },
  ];

  const recentActivity = [
    { icon: CheckCircle, action: 'Submitted field report', farm: 'Wanjiku Farm', date: 'Jun 28' },
    { icon: Radio, action: 'Replaced sensor', farm: 'Phiri Farm', date: 'Jun 26' },
    { icon: Sprout, action: 'Completed onboarding', farm: 'Achieng Farm', date: 'Jun 24' },
    { icon: Edit, action: 'Logged extension recommendation', farm: 'Mensah Farm', date: 'Jun 22' },
    { icon: Radio, action: 'Uploaded drone scan', farm: 'Okello Farm', date: 'Jun 20' },
  ];

  return (
    <AdminLayout role="field_agent">
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">My Profile</h1>
          <p className="text-muted-foreground text-lg">Manage your account settings</p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-lg border-none">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 bg-primary text-primary-foreground">
                <AvatarFallback className="text-3xl font-bold">DO</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left space-y-3">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-2">David Ouma</h2>
                  <Badge className="bg-green-500 text-white mb-3">🟢 Field Agent</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span><strong>Region:</strong> Nakuru, Kenya 🇰🇪</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span><strong>Staff ID:</strong> OG-KE-0042</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span><strong>Member since:</strong> February 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span><strong>Email:</strong> david.ouma@outgrow.africa</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span><strong>Phone:</strong> +254 722 445 881</span>
                  </div>
                </div>
              </div>

              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2" onClick={() => console.log('Edit profile')}>
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Region Stats */}
        <div>
          <h2 className="text-xl font-serif font-bold text-primary mb-4">My Region Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-md border-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Sprout className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-primary">38</p>
                    <p className="text-xs text-muted-foreground">Farms Assigned</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">14</p>
                    <p className="text-xs text-muted-foreground">Visits This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Radio className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">112</p>
                    <p className="text-xs text-muted-foreground">Devices Managed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold text-red-600">3</p>
                    <p className="text-xs text-muted-foreground">Open Alerts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Field Visits */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Upcoming Field Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Farm</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Location</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Visit Type</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingVisits.map((visit, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{visit.farm}</td>
                      <td className="p-3 text-sm text-muted-foreground">{visit.location}</td>
                      <td className="p-3 text-sm">{visit.visitType}</td>
                      <td className="p-3 text-sm text-muted-foreground">{visit.dateTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full md:w-auto" onClick={() => console.log('View full schedule')}>
                View Full Schedule →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                    <Icon className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {activity.action} — {activity.farm}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.date}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔔</span>
                  <span className="font-medium">Push notifications</span>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <span className="font-medium">SMS alerts for farm emergencies</span>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌐</span>
                  <span className="font-medium">Language</span>
                </div>
                <Badge variant="outline">English</Badge>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 pt-4 border-t">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2" onClick={() => console.log('Change password')}>
                <Lock className="h-4 w-4" />
                Change Password
              </Button>
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 gap-2" onClick={() => console.log('Sign out')}>
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
