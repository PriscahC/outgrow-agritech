import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { FarmHealthScore } from '@/components/dashboard/FarmHealthScore';
import { KeyStats } from '@/components/dashboard/KeyStats';
import { SoilpHChart } from '@/components/dashboard/SoilpHChart';
import { YieldForecastChart } from '@/components/dashboard/YieldForecastChart';
import { IoTSensorReadings } from '@/components/dashboard/IoTSensorReadings';
import { PestAlerts } from '@/components/dashboard/PestAlerts';
import { SmsNotificationLog } from '@/components/dashboard/SmsNotificationLog';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useAuth } from '@/contexts/AuthContext';
import {
  getFarmerFarms,
  getSensorReadings,
  getLatestSensorReadings,
  getFarmAlerts,
  getSmsLogs,
  getYieldData,
  createFarm,
} from '@/db/api';
import type { Farm, SensorReading, Alert, SmsLog, YieldData } from '@/types/index';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardPage = () => {
  const { profile } = useAuth();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [soilpHReadings, setSoilpHReadings] = useState<SensorReading[]>([]);
  const [latestReadings, setLatestReadings] = useState<SensorReading[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [smsLogs, setSmsLogs] = useState<SmsLog[]>([]);
  const [yieldData, setYieldData] = useState<YieldData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get or create farm
        let farms = await getFarmerFarms();
        
        if (farms.length === 0) {
          // Create a default farm for new users
          const newFarm = await createFarm({
            farm_name: 'My Farm',
            latitude: -1.286389,
            longitude: 36.817223,
            size_acres: 3.2,
            current_crop: 'Maize',
            days_to_harvest: 34,
            health_score: 88,
          });
          if (newFarm) {
            farms = [newFarm];
          }
        }

        if (farms.length > 0) {
          const currentFarm = farms[0];
          setFarm(currentFarm);

          // Fetch all dashboard data
          const [soilpH, latest, farmAlerts, logs, yields] = await Promise.all([
            getSensorReadings(currentFarm.id, 'soil_ph', 30),
            getLatestSensorReadings(currentFarm.id),
            getFarmAlerts(currentFarm.id, 10),
            getSmsLogs(5),
            getYieldData(currentFarm.id),
          ]);

          setSoilpHReadings(soilpH);
          setLatestReadings(latest);
          setAlerts(farmAlerts);
          setSmsLogs(logs);
          setYieldData(yields);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <Skeleton className="h-32 w-full bg-muted" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 bg-muted" />
            ))}
          </div>
          <Skeleton className="h-64 w-full bg-muted" />
        </div>
      </DashboardLayout>
    );
  }

  const soilMoisture = latestReadings.find((r) => r.reading_type === 'soil_moisture')?.value || null;

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        <WelcomeBanner
          farmerName={(profile?.full_name || null) as string | null}
          latitude={farm?.latitude || null}
          longitude={farm?.longitude || null}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <KeyStats
              currentCrop={farm?.current_crop || null}
              farmSize={farm?.size_acres || null}
              daysToHarvest={farm?.days_to_harvest || null}
              soilMoisture={soilMoisture}
            />

            {soilpHReadings.length > 0 && <SoilpHChart readings={soilpHReadings} />}

            {yieldData.length > 0 && <YieldForecastChart yieldData={yieldData} />}
          </div>

          <div className="space-y-6">
            <FarmHealthScore score={farm?.health_score || 75} />
          </div>
        </div>

        {latestReadings.length > 0 && <IoTSensorReadings readings={latestReadings} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PestAlerts alerts={alerts} />
          <SmsNotificationLog smsLogs={smsLogs} />
        </div>

        <QuickActions />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
