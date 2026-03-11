import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sprout, Calendar, TrendingUp, Droplets, Bug, Leaf, AlertTriangle, CheckCircle, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CropMonitorPage = () => {
  // Dummy data for Priscah W. - Maize crop
  const cropData = {
    farmer: 'Priscah W.',
    country: '🇰🇪 Kenya',
    crop: 'Maize',
    variety: 'Duma 43 Variety',
    farmSize: '3.2 acres',
    zone: 'Nakuru, Rift Valley',
    season: 'Long Rains 2025',
    plantedDate: 'March 3, 2025',
    expectedHarvest: 'July 18, 2025',
    daysToHarvest: 34,
    currentStage: 'Tasseling',
  };

  const growthStages = [
    { name: 'Germination', date: 'Mar 3', status: 'completed', tip: 'Ensure adequate soil moisture for seed germination' },
    { name: 'Seedling', date: 'Mar 17', status: 'completed', tip: 'Protect young plants from pests and weeds' },
    { name: 'Vegetative', date: 'Apr 10', status: 'completed', tip: 'Ensure adequate nitrogen at vegetative stage' },
    { name: 'Flowering', date: 'May 22', status: 'completed', tip: 'Monitor for pest activity during flowering' },
    { name: 'Tasseling', date: 'Jun 15', status: 'current', tip: 'Critical water period - maintain soil moisture above 60%' },
    { name: 'Maturity', date: 'Jul 18', status: 'upcoming', tip: 'Prepare for harvest and storage' },
  ];

  const healthIndicators = [
    { icon: <Leaf className="h-6 w-6 text-green-500" />, label: 'Canopy Cover', value: '87%', status: 'Good', color: 'bg-green-500/10 text-green-700' },
    { icon: <Bug className="h-6 w-6 text-yellow-600" />, label: 'Pest Pressure', value: 'Medium', status: 'Medium', color: 'bg-yellow-500/10 text-yellow-700' },
    { icon: <Droplets className="h-6 w-6 text-green-500" />, label: 'Water Stress Index', value: 'Low', status: 'Low', color: 'bg-green-500/10 text-green-700' },
    { icon: <TrendingUp className="h-6 w-6 text-red-500" />, label: 'Nutrient Status', value: 'Nitrogen Low', status: 'Low', color: 'bg-red-500/10 text-red-700' },
  ];

  const pestAlerts = [
    { date: 'Jun 28', alert: 'Fall Armyworm detected — Zone B', severity: 'High', severityColor: 'bg-red-500', status: 'Action Required' },
    { date: 'Jun 21', alert: 'Gray Leaf Spot risk elevated', severity: 'Medium', severityColor: 'bg-yellow-500', status: 'Monitoring' },
    { date: 'Jun 10', alert: 'Aphid activity — low levels', severity: 'Low', severityColor: 'bg-green-500', status: 'Resolved' },
    { date: 'May 30', alert: 'No issues detected', severity: 'Clear', severityColor: 'bg-green-500', status: '—' },
  ];

  const activitySchedule = [
    { date: 'Jun 30', activity: 'Top dressing', input: 'CAN Fertilizer — 25kg/acre', status: 'due', icon: <Clock className="h-4 w-4" /> },
    { date: 'Jul 5', activity: 'Pest spray', input: 'Ampligo 150ZC — 200ml/20L', status: 'upcoming', icon: <Calendar className="h-4 w-4" /> },
    { date: 'Jul 10', activity: 'Irrigation check', input: 'IoT moisture threshold', status: 'upcoming', icon: <Calendar className="h-4 w-4" /> },
    { date: 'Jun 20', activity: 'Weeding', input: 'Manual — completed', status: 'done', icon: <CheckCircle className="h-4 w-4" /> },
    { date: 'Jun 5', activity: 'Foliar feed', input: 'Optimizer Plus', status: 'done', icon: <CheckCircle className="h-4 w-4" /> },
  ];

  const yieldData = [
    { category: 'Expected', bags: 18 },
    { category: 'Last Season', bags: 13 },
    { category: 'Regional Avg', bags: 15 },
  ];

  const getStageIcon = (status: string) => {
    if (status === 'completed') return '✅';
    if (status === 'current') return '🟡';
    return '⬜';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'due':
        return <Badge className="bg-yellow-500 text-white">⏳ Due Soon</Badge>;
      case 'upcoming':
        return <Badge className="bg-muted text-muted-foreground">⬜ Upcoming</Badge>;
      case 'done':
        return <Badge className="bg-green-500 text-white">✅ Done</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Crop Monitor</h1>
          <p className="text-muted-foreground">Track your crop's growth, health, and receive real-time alerts</p>
        </div>

        {/* 1. Crop Overview Banner */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-2xl">
                  <Sprout className="h-8 w-8 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/80 mb-1">Crop & Variety</p>
                  <p className="text-xl font-bold">{cropData.crop}</p>
                  <p className="text-sm text-primary-foreground/90">{cropData.variety}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-2xl">
                  <Calendar className="h-8 w-8 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/80 mb-1">Season</p>
                  <p className="text-xl font-bold">{cropData.season}</p>
                  <p className="text-sm text-primary-foreground/90">Planted: {cropData.plantedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-2xl">
                  <TrendingUp className="h-8 w-8 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/80 mb-1">Expected Harvest</p>
                  <p className="text-xl font-bold">{cropData.expectedHarvest}</p>
                  <Badge className="mt-1 bg-secondary text-secondary-foreground font-bold">
                    {cropData.daysToHarvest} days
                  </Badge>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-2xl">
                  <Leaf className="h-8 w-8 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/80 mb-1">Current Stage</p>
                  <Badge className="mt-1 bg-secondary text-secondary-foreground text-lg font-bold px-4 py-2">
                    {cropData.currentStage}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Growth Stage Tracker */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Growth Stage Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-muted hidden md:block" style={{ zIndex: 0 }} />
              <div className="absolute top-6 left-0 h-1 bg-secondary hidden md:block" style={{ width: '66%', zIndex: 1 }} />

              {/* Stages */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative" style={{ zIndex: 2 }}>
                {growthStages.map((stage, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 ${
                        stage.status === 'completed'
                          ? 'bg-green-500'
                          : stage.status === 'current'
                          ? 'bg-secondary'
                          : 'bg-muted'
                      }`}
                    >
                      {getStageIcon(stage.status)}
                    </div>
                    <p className={`font-bold mb-1 ${stage.status === 'current' ? 'text-secondary' : 'text-foreground'}`}>
                      {stage.name}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">{stage.date}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{stage.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Health Indicators Row */}
        <div>
          <h3 className="text-xl font-serif font-bold text-primary mb-4">Health Indicators</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {healthIndicators.map((indicator, index) => (
              <Card key={index} className="shadow-md border-none">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className={`p-3 rounded-2xl ${indicator.color}`}>
                    {indicator.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{indicator.label}</p>
                    <p className="text-2xl font-bold font-serif text-primary">{indicator.value}</p>
                    <p className={`text-sm font-semibold mt-1 ${indicator.color}`}>({indicator.status})</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 4. Pest & Disease Alert Timeline */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-secondary" />
              Pest & Disease Alert Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pestAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-sm font-semibold text-muted-foreground min-w-[60px]">{alert.date}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground mb-1">{alert.alert}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={`${alert.severityColor} text-white text-xs`}>
                          {alert.severity === 'High' && '🔴'} {alert.severity === 'Medium' && '🟡'}{' '}
                          {alert.severity === 'Low' && '🟢'} {alert.severity === 'Clear' && '🟢'} {alert.severity}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{alert.status}</span>
                      </div>
                    </div>
                  </div>
                  {alert.severity !== 'Clear' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-secondary text-secondary hover:bg-secondary/10"
                      onClick={() => console.log('Ask AI Advisor')}
                    >
                      Ask AI Advisor <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 5. Input & Activity Schedule */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Input & Activity Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activitySchedule.map((activity, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-sm font-semibold text-muted-foreground min-w-[60px]">{activity.date}</div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground mb-1">{activity.activity}</p>
                      <p className="text-sm text-muted-foreground">{activity.input}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {activity.icon}
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 6. Yield Projection Card */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Yield Projection</CardTitle>
            <p className="text-sm text-muted-foreground">Comparison of expected vs historical yields (90kg bags)</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-serif text-primary">18</span>
                  <span className="text-xl text-muted-foreground">bags</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last season:</span>
                    <span className="font-semibold">13 bags</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Regional average:</span>
                    <span className="font-semibold">15 bags</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Improvement:</span>
                    <span className="font-semibold text-green-600">+38% vs last season</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground italic">
                    Yield projection updated based on IoT data and growth stage — June 28
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
                    <Legend />
                    <Bar dataKey="bags" fill="hsl(var(--secondary))" name="Bags (90kg)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Extension Advice Card */}
        <Card className="shadow-lg border-none bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-secondary" />
              Extension Advice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-card p-6 rounded-xl border-l-4 border-secondary">
              <p className="text-foreground leading-relaxed mb-4 italic">
                "Your crop is in tasseling stage — this is the most critical period for water. Ensure soil moisture stays
                above 60%. Avoid any moisture stress in the next 2 weeks to protect grain set."
              </p>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t">
                <div>
                  <p className="font-bold text-primary">James Otieno</p>
                  <p className="text-sm text-muted-foreground">Outgrow Kenya Agronomist</p>
                  <p className="text-xs text-muted-foreground mt-1">Sent via SMS + Dashboard | Jun 26, 2025</p>
                </div>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => console.log('Ask question')}>
                  Ask a Question <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CropMonitorPage;
