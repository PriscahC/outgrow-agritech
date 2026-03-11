import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Sprout, 
  Calendar, 
  Radio, 
  Drone, 
  AlertTriangle, 
  Handshake,
  CheckCircle,
  Clock,
  Circle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboardPage = () => {
  const stats = [
    { icon: Sprout, label: 'Total Farms Enrolled', value: '4,847', color: 'text-primary' },
    { icon: Calendar, label: 'New This Month', value: '134', color: 'text-green-600' },
    { icon: Radio, label: 'IoT Devices Online', value: '3,921', subtitle: '/ 4,102', color: 'text-blue-600' },
    { icon: Drone, label: 'Drone Scans This Month', value: '89', color: 'text-purple-600' },
    { icon: AlertTriangle, label: 'Active Alerts', value: '23', color: 'text-red-600' },
    { icon: Handshake, label: 'Buyer Offers Pending', value: '41', color: 'text-secondary' },
  ];

  const farmsByCountry = [
    { country: 'Kenya', farms: 1840, flag: '🇰🇪' },
    { country: 'Uganda', farms: 1120, flag: '🇺🇬' },
    { country: 'Nigeria', farms: 980, flag: '🇳🇬' },
    { country: 'Ghana', farms: 640, flag: '🇬🇭' },
    { country: 'Malawi', farms: 267, flag: '🇲🇼' },
  ];

  const fieldVisits = [
    {
      agent: 'David Ouma',
      farm: 'Wanjiku Farm',
      location: 'Nakuru, KE',
      visitType: 'IoT Check',
      time: '9:00 AM',
      status: 'Done',
      statusColor: 'bg-green-500',
      statusIcon: CheckCircle,
    },
    {
      agent: 'Amina Hassan',
      farm: 'Okello Farm',
      location: 'Gulu, UG',
      visitType: 'Onboarding',
      time: '11:00 AM',
      status: 'In Progress',
      statusColor: 'bg-yellow-500',
      statusIcon: Clock,
    },
    {
      agent: 'Chidi Eze',
      farm: 'Adaeze Farm',
      location: 'Enugu, NG',
      visitType: 'Drone Scan',
      time: '2:00 PM',
      status: 'Upcoming',
      statusColor: 'bg-muted',
      statusIcon: Circle,
    },
  ];

  const activeAlerts = [
    {
      severity: 'critical',
      icon: '🔴',
      message: 'IoT sensor offline — Phiri Farm, Malawi',
      time: '6 hrs ago',
    },
    {
      severity: 'critical',
      icon: '🔴',
      message: 'High pest alert — Mensah Farm, Ghana',
      time: '12 hrs ago',
    },
    {
      severity: 'warning',
      icon: '🟡',
      message: 'Soil pH critical — Achieng Farm, Kisumu',
      time: '1 day ago',
    },
    {
      severity: 'warning',
      icon: '🟡',
      message: 'Device battery low — Okello Farm, Uganda',
      time: '1 day ago',
    },
  ];

  return (
    <AdminLayout role="admin">
      <div className="p-4 md:p-6 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">
            Good morning, Sarah 👋
          </h1>
          <p className="text-primary-foreground/90 text-lg">
            Here's today's overview across all 5 countries.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-md border-none">
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                    <div>
                      <p className="text-2xl md:text-3xl font-bold font-serif text-primary">
                        {stat.value}
                        {stat.subtitle && <span className="text-lg text-muted-foreground">{stat.subtitle}</span>}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Farms by Country */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-primary">Farms by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={farmsByCountry} layout="vertical">
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="country" type="category" width={80} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="farms" fill="hsl(var(--secondary))" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {farmsByCountry.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{item.flag}</span>
                      <span className="font-medium">{item.country}</span>
                    </span>
                    <span className="font-bold text-primary">{item.farms.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Field Visit Schedule */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-primary">Field Visit Schedule</CardTitle>
              <p className="text-sm text-muted-foreground">Today's visits</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldVisits.map((visit, index) => {
                  const StatusIcon = visit.statusIcon;
                  return (
                    <div key={index} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-foreground">{visit.farm}</p>
                          <p className="text-sm text-muted-foreground">{visit.agent}</p>
                        </div>
                        <Badge className={`${visit.statusColor} text-white flex items-center gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {visit.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <div>
                          <p className="font-semibold text-foreground">{visit.location}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{visit.visitType}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{visit.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts Feed */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Active Alerts
            </CardTitle>
            <p className="text-sm text-muted-foreground">Most urgent first</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{alert.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => console.log('Assign agent')}>
                    Assign to Agent →
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
