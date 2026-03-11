import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Map, 
  Satellite, 
  Thermometer, 
  Droplets, 
  MapPin, 
  Drone, 
  Battery, 
  Wifi, 
  WifiOff,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

const FarmMapPage = () => {
  const [mapView, setMapView] = useState<'satellite' | 'map'>('satellite');
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [showMoistureMap, setShowMoistureMap] = useState(false);
  const [showSensors, setShowSensors] = useState(true);
  const [showDronePath, setShowDronePath] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState<number | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const zones = [
    {
      id: 'A',
      name: 'Zone A',
      acreage: 1.2,
      crop: 'Maize',
      health: 'Healthy',
      healthColor: 'bg-green-500',
      soilPH: 6.5,
      moisture: 72,
      lastReading: '2 hours ago',
    },
    {
      id: 'B',
      name: 'Zone B',
      acreage: 1.0,
      crop: 'Maize',
      health: 'Watch',
      healthColor: 'bg-yellow-500',
      soilPH: 5.8,
      moisture: 58,
      lastReading: '2 hours ago',
    },
    {
      id: 'C',
      name: 'Zone C',
      acreage: 1.0,
      crop: 'Maize',
      health: 'Healthy',
      healthColor: 'bg-green-500',
      soilPH: 6.7,
      moisture: 68,
      lastReading: '2 hours ago',
    },
  ];

  const sensors = [
    {
      id: 1,
      name: 'North Field — Sensor 01',
      battery: 85,
      online: true,
      lastPing: '5 min ago',
      temp: 24,
      humidity: 65,
      moisture: 72,
      x: 30,
      y: 25,
    },
    {
      id: 2,
      name: 'Central Field — Sensor 02',
      battery: 92,
      online: true,
      lastPing: '3 min ago',
      temp: 26,
      humidity: 58,
      moisture: 58,
      x: 50,
      y: 50,
    },
    {
      id: 3,
      name: 'South Field — Sensor 03',
      battery: 45,
      online: true,
      lastPing: '8 min ago',
      temp: 25,
      humidity: 62,
      moisture: 68,
      x: 70,
      y: 75,
    },
  ];

  const droneScans = [
    {
      date: 'June 20, 2025',
      coverage: '3.2 acres',
      status: 'Processed',
      statusColor: 'bg-green-500',
    },
    {
      date: 'May 15, 2025',
      coverage: '3.2 acres',
      status: 'Processed',
      statusColor: 'bg-green-500',
    },
    {
      date: 'April 10, 2025',
      coverage: '3.2 acres',
      status: 'Processed',
      statusColor: 'bg-green-500',
    },
  ];

  const handleRequestScan = () => {
    toast.success('Your request has been sent. Our field team will confirm within 24 hours via SMS.');
    setIsRequestModalOpen(false);
  };

  const controlButtons = [
    {
      icon: mapView === 'satellite' ? Satellite : Map,
      label: mapView === 'satellite' ? 'Satellite' : 'Map',
      active: true,
      onClick: () => setMapView(mapView === 'satellite' ? 'map' : 'satellite'),
    },
    {
      icon: Thermometer,
      label: 'Heat',
      active: showHeatMap,
      onClick: () => {
        setShowHeatMap(!showHeatMap);
        if (!showHeatMap) setShowMoistureMap(false);
      },
    },
    {
      icon: Droplets,
      label: 'Moisture',
      active: showMoistureMap,
      onClick: () => {
        setShowMoistureMap(!showMoistureMap);
        if (!showMoistureMap) setShowHeatMap(false);
      },
    },
    {
      icon: MapPin,
      label: 'Sensors',
      active: showSensors,
      onClick: () => setShowSensors(!showSensors),
    },
    {
      icon: Drone,
      label: 'Drone Path',
      active: showDronePath,
      onClick: () => setShowDronePath(!showDronePath),
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">
        {/* Slim Top Bar */}
        <div className="bg-card border-b px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Last updated: 2 hours ago</p>
          </div>
          <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 h-8 text-xs">
                <Drone className="h-4 w-4" />
                <span className="hidden sm:inline">Request Scan</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif text-primary">Request Drone Scan</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="scan-date">Preferred Scan Date</Label>
                  <Input id="scan-date" type="date" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="scan-reason">Reason for Scan</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine Check</SelectItem>
                      <SelectItem value="pest">Pest Suspicion</SelectItem>
                      <SelectItem value="harvest">Post-Harvest</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any specific areas of concern?" className="mt-2" />
                </div>
                <Button 
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={handleRequestScan}
                >
                  Request Scan →
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Map View - Full Screen */}
          <div className="flex-1 relative bg-muted">
            {/* Map Mockup */}
            <div className="absolute inset-0 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                {/* Background */}
                <rect x="0" y="0" width="100" height="100" fill={mapView === 'satellite' ? '#2d3e2f' : '#e8f5e9'} />
                
                {/* Farm Boundary */}
                <path
                  d="M 10,10 L 90,10 L 90,90 L 10,90 Z"
                  fill="none"
                  stroke="#D4A017"
                  strokeWidth="0.5"
                  strokeDasharray="2,1"
                />

                {/* Zone A (Top) */}
                <path
                  d="M 10,10 L 90,10 L 90,35 L 10,35 Z"
                  fill={showHeatMap ? '#4ade80' : showMoistureMap ? '#60a5fa' : 'rgba(74, 222, 128, 0.3)'}
                  stroke="#D4A017"
                  strokeWidth="0.3"
                />
                <text x="50" y="22" textAnchor="middle" fill="#1B4332" fontSize="4" fontWeight="bold">
                  Zone A
                </text>

                {/* Zone B (Middle) */}
                <path
                  d="M 10,35 L 90,35 L 90,65 L 10,65 Z"
                  fill={showHeatMap ? '#fbbf24' : showMoistureMap ? '#93c5fd' : 'rgba(251, 191, 36, 0.3)'}
                  stroke="#D4A017"
                  strokeWidth="0.3"
                />
                <text x="50" y="50" textAnchor="middle" fill="#1B4332" fontSize="4" fontWeight="bold">
                  Zone B
                </text>

                {/* Zone C (Bottom) */}
                <path
                  d="M 10,65 L 90,65 L 90,90 L 10,90 Z"
                  fill={showHeatMap ? '#4ade80' : showMoistureMap ? '#60a5fa' : 'rgba(74, 222, 128, 0.3)'}
                  stroke="#D4A017"
                  strokeWidth="0.3"
                />
                <text x="50" y="77" textAnchor="middle" fill="#1B4332" fontSize="4" fontWeight="bold">
                  Zone C
                </text>

                {/* Drone Path */}
                {showDronePath && (
                  <path
                    d="M 15,15 L 85,15 L 85,85 L 15,85 L 15,15"
                    fill="none"
                    stroke="#D4A017"
                    strokeWidth="0.3"
                    strokeDasharray="1,1"
                    opacity="0.6"
                  />
                )}

                {/* IoT Sensors */}
                {showSensors && sensors.map((sensor) => (
                  <g key={sensor.id}>
                    <circle
                      cx={sensor.x}
                      cy={sensor.y}
                      r="2"
                      fill="#D4A017"
                      stroke="white"
                      strokeWidth="0.3"
                      className="cursor-pointer hover:r-3 transition-all"
                      onClick={() => setSelectedSensor(sensor.id)}
                    />
                    <circle
                      cx={sensor.x}
                      cy={sensor.y}
                      r="4"
                      fill="none"
                      stroke="#D4A017"
                      strokeWidth="0.2"
                      opacity="0.3"
                    />
                  </g>
                ))}
              </svg>

              {/* Sensor Popup */}
              {selectedSensor && (
                <div 
                  className="absolute bg-card border-2 border-secondary rounded-xl p-4 shadow-2xl z-10"
                  style={{
                    left: `${sensors.find(s => s.id === selectedSensor)?.x}%`,
                    top: `${sensors.find(s => s.id === selectedSensor)?.y}%`,
                    transform: 'translate(-50%, -120%)',
                  }}
                >
                  <button
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSelectedSensor(null)}
                  >
                    ✕
                  </button>
                  <h4 className="font-bold text-primary mb-3">
                    {sensors.find(s => s.id === selectedSensor)?.name}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Temperature:</span>
                      <span className="font-semibold">{sensors.find(s => s.id === selectedSensor)?.temp}°C</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Humidity:</span>
                      <span className="font-semibold">{sensors.find(s => s.id === selectedSensor)?.humidity}%</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Soil Moisture:</span>
                      <span className="font-semibold">{sensors.find(s => s.id === selectedSensor)?.moisture}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Soil pH Legend - Bottom Right */}
            <div className="absolute bottom-20 md:bottom-4 right-4 z-10">
              {showLegend ? (
                <Card className="shadow-lg border-none max-w-xs">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-sm text-primary">Soil pH Zones</h4>
                      <button
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => setShowLegend(false)}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-500" />
                        <span>pH 6.0–7.0 (Optimal)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-yellow-500" />
                        <span>pH 5.0–5.9 (Slightly Acidic)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-500" />
                        <span>pH &lt;5.0 or &gt;7.5 (Action Required)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Button
                  size="icon"
                  className="bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg rounded-full h-12 w-12"
                  onClick={() => setShowLegend(true)}
                >
                  <Info className="h-6 w-6" />
                </Button>
              )}
            </div>
          </div>

          {/* Desktop Right Panel - Hidden on Mobile */}
          <div className="hidden lg:block w-96 bg-background border-l overflow-y-auto p-4 space-y-4">
            {/* Map Controls - Desktop */}
            <Card className="shadow-lg border-none">
              <CardContent className="p-4 space-y-2">
                {controlButtons.map((btn, index) => {
                  const Icon = btn.icon;
                  return (
                    <Button
                      key={index}
                      variant={btn.active ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-start gap-2"
                      onClick={btn.onClick}
                    >
                      <Icon className="h-4 w-4" />
                      {btn.label}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Drone Scan History */}
            <Card className="shadow-lg border-none">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <Drone className="h-5 w-5 text-secondary" />
                  Drone Scans
                </h3>
                {droneScans.map((scan, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl ${index === 0 ? 'bg-secondary/10 border border-secondary' : 'bg-muted/50'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Drone className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-bold text-sm">{scan.date}</p>
                          <Badge className={`${scan.statusColor} text-white text-xs`}>{scan.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{scan.coverage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Zone Breakdown */}
            <div className="space-y-3">
              <h3 className="font-bold text-primary">Zones</h3>
              {zones.map((zone) => (
                <Card key={zone.id} className="shadow-md border-none">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-sm text-primary">{zone.name}</h4>
                        <p className="text-xs text-muted-foreground">{zone.acreage} acres</p>
                      </div>
                      <Badge className={`${zone.healthColor} text-white text-xs`}>{zone.health}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">pH:</span>
                        <span className="font-semibold">{zone.soilPH}</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Moisture:</span>
                          <span className="font-semibold">{zone.moisture}%</span>
                        </div>
                        <Progress value={zone.moisture} className="h-1.5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* IoT Sensors */}
            <Card className="shadow-lg border-none">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  IoT Sensors
                </h3>
                {sensors.map((sensor) => (
                  <div key={sensor.id} className="p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm">{sensor.name}</h4>
                      {sensor.online ? (
                        <Wifi className="h-4 w-4 text-green-500" />
                      ) : (
                        <WifiOff className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Battery className={`h-3 w-3 ${sensor.battery > 50 ? 'text-green-500' : 'text-yellow-500'}`} />
                        <Progress value={sensor.battery} className="h-1.5 flex-1" />
                        <span className="text-xs font-semibold">{sensor.battery}%</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-xs">
                        <div className="text-center p-1 bg-background rounded">
                          <p className="text-muted-foreground">Temp</p>
                          <p className="font-bold">{sensor.temp}°C</p>
                        </div>
                        <div className="text-center p-1 bg-background rounded">
                          <p className="text-muted-foreground">Humid</p>
                          <p className="font-bold">{sensor.humidity}%</p>
                        </div>
                        <div className="text-center p-1 bg-background rounded">
                          <p className="text-muted-foreground">Moist</p>
                          <p className="font-bold">{sensor.moisture}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Bottom Controls Bar */}
        <div className="lg:hidden fixed bottom-16 left-0 right-0 z-20 px-4 pb-2">
          <div className="bg-primary/95 backdrop-blur-sm rounded-full shadow-2xl px-3 py-2 flex gap-2 overflow-x-auto">
            {controlButtons.map((btn, index) => {
              const Icon = btn.icon;
              return (
                <button
                  key={index}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-full whitespace-nowrap transition-colors ${
                    btn.active
                      ? 'bg-secondary text-secondary-foreground'
                      : 'text-primary-foreground hover:bg-primary-foreground/10'
                  }`}
                  onClick={btn.onClick}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Info Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="lg:hidden fixed bottom-20 left-4 z-20 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg rounded-full h-12 w-12"
            >
              <MapPin className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-xl font-serif text-primary">Farm Details</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 pt-4">
              {/* Zones */}
              <div className="space-y-3">
                <h3 className="font-bold text-primary">Zones</h3>
                {zones.map((zone) => (
                  <Card key={zone.id} className="shadow-md border-none">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-sm text-primary">{zone.name}</h4>
                          <p className="text-xs text-muted-foreground">{zone.acreage} acres • {zone.crop}</p>
                        </div>
                        <Badge className={`${zone.healthColor} text-white text-xs`}>{zone.health}</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Soil pH:</span>
                          <span className="font-semibold">{zone.soilPH}</span>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Moisture:</span>
                            <span className="font-semibold">{zone.moisture}%</span>
                          </div>
                          <Progress value={zone.moisture} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sensors */}
              <div className="space-y-3">
                <h3 className="font-bold text-primary">IoT Sensors</h3>
                {sensors.map((sensor) => (
                  <div key={sensor.id} className="p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm">{sensor.name}</h4>
                      {sensor.online ? (
                        <Wifi className="h-4 w-4 text-green-500" />
                      ) : (
                        <WifiOff className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Battery className={`h-3 w-3 ${sensor.battery > 50 ? 'text-green-500' : 'text-yellow-500'}`} />
                        <Progress value={sensor.battery} className="h-2 flex-1" />
                        <span className="text-xs font-semibold">{sensor.battery}%</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center p-2 bg-background rounded">
                          <p className="text-muted-foreground mb-1">Temp</p>
                          <p className="font-bold">{sensor.temp}°C</p>
                        </div>
                        <div className="text-center p-2 bg-background rounded">
                          <p className="text-muted-foreground mb-1">Humidity</p>
                          <p className="font-bold">{sensor.humidity}%</p>
                        </div>
                        <div className="text-center p-2 bg-background rounded">
                          <p className="text-muted-foreground mb-1">Moisture</p>
                          <p className="font-bold">{sensor.moisture}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Drone Scans */}
              <div className="space-y-3">
                <h3 className="font-bold text-primary">Recent Drone Scans</h3>
                {droneScans.map((scan, index) => (
                  <div key={index} className="p-3 rounded-xl bg-muted/50">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Drone className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-bold text-sm">{scan.date}</p>
                          <Badge className={`${scan.statusColor} text-white text-xs`}>{scan.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{scan.coverage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
};

export default FarmMapPage;
