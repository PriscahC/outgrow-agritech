import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Radio, Battery, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

const DeviceManagementPage = () => {
  const devices = [
    { id: 'SN-00124', farm: 'Wanjiku Farm', location: 'Nakuru, KE', status: 'online', battery: 87, lastPing: '2 min ago' },
    { id: 'SN-00891', farm: 'Phiri Farm', location: 'Lilongwe, MW', status: 'offline', battery: 12, lastPing: '6 hrs ago' },
    { id: 'SN-00432', farm: 'Okello Farm', location: 'Gulu, UG', status: 'low_battery', battery: 18, lastPing: '45 min ago' },
    { id: 'SN-00567', farm: 'Mensah Farm', location: 'Kumasi, GH', status: 'online', battery: 92, lastPing: '1 min ago' },
    { id: 'SN-00789', farm: 'Adaeze Farm', location: 'Enugu, NG', status: 'online', battery: 76, lastPing: '5 min ago' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500 text-white flex items-center gap-1"><Wifi className="h-3 w-3" />Online</Badge>;
      case 'offline':
        return <Badge className="bg-red-500 text-white flex items-center gap-1"><WifiOff className="h-3 w-3" />Offline</Badge>;
      case 'low_battery':
        return <Badge className="bg-yellow-500 text-white flex items-center gap-1"><Battery className="h-3 w-3" />Low Battery</Badge>;
      default:
        return null;
    }
  };

  const onlineCount = devices.filter(d => d.status === 'online').length;
  const offlineCount = devices.filter(d => d.status === 'offline').length;
  const lowBatteryCount = devices.filter(d => d.status === 'low_battery' || d.battery < 20).length;

  return (
    <AdminLayout role="admin">
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Device Management</h1>
          <p className="text-muted-foreground text-lg">Monitor all IoT sensors and devices across the network</p>
        </div>

        {/* Summary Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-md border-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Radio className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-primary">4,102</p>
                  <p className="text-xs text-muted-foreground">Total Devices</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Wifi className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{onlineCount}</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <WifiOff className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{offlineCount}</p>
                  <p className="text-xs text-muted-foreground">Offline</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Battery className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{lowBatteryCount}</p>
                  <p className="text-xs text-muted-foreground">Low Battery</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Table */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-primary">All Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Farm</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Location</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Sensor ID</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Battery</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Last Ping</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{device.farm}</td>
                      <td className="p-3 text-sm text-muted-foreground">{device.location}</td>
                      <td className="p-3 text-sm font-mono">{device.id}</td>
                      <td className="p-3">{getStatusBadge(device.status)}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Battery className={`h-4 w-4 ${device.battery < 20 ? 'text-red-500' : 'text-green-500'}`} />
                          <span className="text-sm font-semibold">{device.battery}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{device.lastPing}</td>
                      <td className="p-3">
                        {device.status === 'offline' ? (
                          <Button size="sm" variant="outline" className="text-red-500" onClick={() => console.log('Assign fix')}>
                            Assign Fix
                          </Button>
                        ) : (
                          <Button size="sm" variant="ghost" onClick={() => console.log('View')}>
                            View
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Offline Device Alert Panel */}
        <Card className="shadow-lg border-none bg-red-50">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Offline Devices Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {devices.filter(d => d.status === 'offline').map((device) => (
                <div key={device.id} className="flex items-center justify-between p-4 rounded-xl bg-white">
                  <div>
                    <p className="font-bold text-foreground">{device.farm}</p>
                    <p className="text-sm text-muted-foreground">{device.id} • {device.location} • Last seen: {device.lastPing}</p>
                  </div>
                  <Button size="sm" className="bg-red-600 text-white hover:bg-red-700" onClick={() => console.log('Dispatch agent')}>
                    Dispatch Field Agent
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

export default DeviceManagementPage;
