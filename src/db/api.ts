import { supabase } from './supabase';
import type { Profile, Farm, SensorReading, Alert, SmsLog, MarketOffer, YieldData } from '@/types/index';

// Profile APIs
export async function getCurrentProfile(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', (await supabase.auth.getUser()).data.user?.id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  return data;
}

export async function updateProfile(updates: Partial<Profile>): Promise<boolean> {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    console.error('Error updating profile:', error);
    return false;
  }
  return true;
}

// Farm APIs
export async function getFarmerFarms(): Promise<Farm[]> {
  const { data, error } = await supabase
    .from('farms')
    .select('*')
    .eq('farmer_id', (await supabase.auth.getUser()).data.user?.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching farms:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function createFarm(farm: Partial<Farm>): Promise<Farm | null> {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  const { data, error } = await supabase
    .from('farms')
    .insert({ ...farm, farmer_id: userId })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating farm:', error);
    return null;
  }
  return data;
}

// Sensor Reading APIs
export async function getSensorReadings(farmId: string, readingType: string, limit = 30): Promise<SensorReading[]> {
  const { data, error } = await supabase
    .from('sensor_readings')
    .select('*')
    .eq('farm_id', farmId)
    .eq('reading_type', readingType)
    .order('recorded_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching sensor readings:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function getLatestSensorReadings(farmId: string): Promise<SensorReading[]> {
  const { data, error } = await supabase
    .from('sensor_readings')
    .select('*')
    .eq('farm_id', farmId)
    .in('reading_type', ['temperature', 'humidity', 'soil_moisture'])
    .order('recorded_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching latest sensor readings:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

// Alert APIs
export async function getFarmAlerts(farmId: string, limit = 10): Promise<Alert[]> {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('farm_id', farmId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

export async function markAlertAsRead(alertId: string): Promise<boolean> {
  const { error } = await supabase
    .from('alerts')
    .update({ is_read: true })
    .eq('id', alertId);

  if (error) {
    console.error('Error marking alert as read:', error);
    return false;
  }
  return true;
}

// SMS Log APIs
export async function getSmsLogs(limit = 5): Promise<SmsLog[]> {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  const { data, error } = await supabase
    .from('sms_logs')
    .select('*')
    .eq('farmer_id', userId)
    .order('sent_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching SMS logs:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

// Market Offer APIs
export async function getMarketOffers(farmId: string): Promise<MarketOffer[]> {
  const { data, error } = await supabase
    .from('market_offers')
    .select('*')
    .eq('farm_id', farmId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching market offers:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

// Yield Data APIs
export async function getYieldData(farmId: string): Promise<YieldData[]> {
  const { data, error } = await supabase
    .from('yield_data')
    .select('*')
    .eq('farm_id', farmId)
    .order('recorded_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching yield data:', error);
    return [];
  }
  return Array.isArray(data) ? data : [];
}

// Weather API
export async function getWeather(lat: number, lon: number) {
  const { data, error } = await supabase.functions.invoke('get-weather', {
    body: { lat, lon, units: 'metric' },
  });

  if (error) {
    const errorMsg = await error?.context?.text();
    console.error('Weather API error:', errorMsg || error?.message);
    return null;
  }

  return data;
}
