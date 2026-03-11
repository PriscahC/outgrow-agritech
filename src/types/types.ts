export type UserRole = 'farmer' | 'admin';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone_number: string | null;
  country: string | null;
  farm_location: string | null;
  primary_crop: string | null;
  acreage: number | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Farm {
  id: string;
  farmer_id: string;
  farm_name: string;
  latitude: number | null;
  longitude: number | null;
  size_acres: number | null;
  current_crop: string | null;
  days_to_harvest: number | null;
  health_score: number;
  created_at: string;
  updated_at: string;
}

export interface SensorReading {
  id: string;
  farm_id: string;
  reading_type: string;
  value: number;
  unit: string | null;
  recorded_at: string;
}

export interface Alert {
  id: string;
  farm_id: string;
  alert_type: string;
  severity: 'Low' | 'Medium' | 'High';
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SmsLog {
  id: string;
  farmer_id: string;
  message: string;
  category: 'Market' | 'Weather' | 'Finance' | 'Extension';
  sent_at: string;
}

export interface MarketOffer {
  id: string;
  farm_id: string;
  buyer_name: string;
  crop_type: string;
  quantity_kg: number;
  price_per_kg: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  expires_at: string | null;
}

export interface YieldData {
  id: string;
  farm_id: string;
  season: string;
  expected_yield_kg: number | null;
  actual_yield_kg: number | null;
  regional_average_kg: number | null;
  recorded_at: string;
}

export interface WeatherData {
  current: {
    dt: number;
    temp: number;
    feels_like: number;
    humidity: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    pop: number;
  }>;
}
