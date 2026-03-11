import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, TrendingUp, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const ReportsPage = () => {
  const seasonSummary = {
    crop: 'Maize',
    planted: 'Mar 3',
    harvest: 'Jul 18',
    farmSize: '3.2 acres',
    expectedYield: 18,
    lastSeasonYield: 13,
    improvement: 38,
  };

  const soilHealthData = [
    { month: 'Mar', pH: 6.2 },
    { month: 'Apr', pH: 6.4 },
    { month: 'May', pH: 6.6 },
    { month: 'Jun', pH: 6.5 },
  ];

  const rainfallData = [
    { month: 'Mar', rainfall: 120, irrigation: 2 },
    { month: 'Apr', rainfall: 180, irrigation: 1 },
    { month: 'May', rainfall: 95, irrigation: 3 },
    { month: 'Jun', rainfall: 60, irrigation: 4 },
  ];

  const inputSpending = [
    { category: 'Seeds', amount: 2400 },
    { category: 'Fertilizer', amount: 5800 },
    { category: 'Pesticides', amount: 1200 },
    { category: 'Labour', amount: 3000 },
  ];

  const totalSpending = inputSpending.reduce((sum, item) => sum + item.amount, 0);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary mb-2">Reports</h1>
            <p className="text-muted-foreground text-lg">A simple summary of how your farm is doing.</p>
          </div>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2" onClick={() => console.log('Download PDF')}>
            <Download className="h-5 w-5" />
            Download Season Report (PDF)
          </Button>
        </div>

        {/* Season Summary Card */}
        <Card className="shadow-lg border-none bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary flex items-center gap-2">
              <FileText className="h-5 w-5 text-secondary" />
              Season Summary — Long Rains 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Crop</p>
                <p className="text-xl font-bold text-primary">{seasonSummary.crop}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Planted</p>
                <p className="text-xl font-bold text-primary">{seasonSummary.planted}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Harvest</p>
                <p className="text-xl font-bold text-primary">{seasonSummary.harvest}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Farm Size</p>
                <p className="text-xl font-bold text-primary">{seasonSummary.farmSize}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Expected Yield</p>
                <p className="text-xl font-bold text-primary">{seasonSummary.expectedYield} bags</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Last Season</p>
                <p className="text-xl font-bold text-primary">{seasonSummary.lastSeasonYield} bags</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <p className="text-lg font-semibold text-green-600">
                Improvement: ↑ {seasonSummary.improvement}% 🎉
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Soil Health Over Time */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Soil Health Over Time</CardTitle>
            <p className="text-sm text-muted-foreground">Soil pH readings (Ideal range: 6.0 - 7.0)</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={soilHealthData}>
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis
                    domain={[5.5, 7.5]}
                    tick={{ fontSize: 12 }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <ReferenceLine y={6.0} stroke="hsl(var(--secondary))" strokeDasharray="3 3" opacity={0.5} />
                  <ReferenceLine y={7.0} stroke="hsl(var(--secondary))" strokeDasharray="3 3" opacity={0.5} />
                  <Line
                    type="monotone"
                    dataKey="pH"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Rainfall vs Irrigation */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Rainfall vs. Irrigation</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly rainfall (mm) and irrigation events</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rainfallData}>
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="rainfall" fill="hsl(var(--primary))" name="Rainfall (mm)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="irrigation" fill="hsl(var(--secondary))" name="Irrigation Events" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Input Spending Summary */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">Input Spending Summary</CardTitle>
            <p className="text-sm text-muted-foreground">Season expenses breakdown</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Category</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount (KSh)</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inputSpending.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-foreground">{item.category}</td>
                        <td className="py-3 px-4 text-right font-bold text-primary">
                          {item.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right text-muted-foreground">
                          {Math.round((item.amount / totalSpending) * 100)}%
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-secondary/10 font-bold">
                      <td className="py-4 px-4 text-lg text-primary">Total</td>
                      <td className="py-4 px-4 text-right text-lg text-secondary">
                        {totalSpending.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right text-lg text-secondary">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Cost per Acre</p>
                    <p className="text-2xl font-bold text-primary">
                      KSh {Math.round(totalSpending / parseFloat(seasonSummary.farmSize)).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Expected Revenue</p>
                    <p className="text-2xl font-bold text-secondary">KSh 57,600</p>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Expected Profit</p>
                    <p className="text-2xl font-bold text-green-600">
                      KSh {(57600 - totalSpending).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
