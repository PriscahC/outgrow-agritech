-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('farmer', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  phone_number text,
  country text,
  farm_location text,
  primary_crop text,
  acreage decimal,
  role user_role DEFAULT 'farmer',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create farms table
CREATE TABLE public.farms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  farm_name text NOT NULL,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  size_acres decimal,
  current_crop text,
  days_to_harvest integer,
  health_score integer DEFAULT 75,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sensor_readings table
CREATE TABLE public.sensor_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid REFERENCES public.farms(id) ON DELETE CASCADE,
  reading_type text NOT NULL,
  value decimal NOT NULL,
  unit text,
  recorded_at timestamptz DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid REFERENCES public.farms(id) ON DELETE CASCADE,
  alert_type text NOT NULL,
  severity text CHECK (severity IN ('Low', 'Medium', 'High')),
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create sms_logs table
CREATE TABLE public.sms_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  category text CHECK (category IN ('Market', 'Weather', 'Finance', 'Extension')),
  sent_at timestamptz DEFAULT now()
);

-- Create market_offers table
CREATE TABLE public.market_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid REFERENCES public.farms(id) ON DELETE CASCADE,
  buyer_name text NOT NULL,
  crop_type text NOT NULL,
  quantity_kg decimal NOT NULL,
  price_per_kg decimal NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Create yield_data table
CREATE TABLE public.yield_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid REFERENCES public.farms(id) ON DELETE CASCADE,
  season text NOT NULL,
  expected_yield_kg decimal,
  actual_yield_kg decimal,
  regional_average_kg decimal,
  recorded_at timestamptz DEFAULT now()
);

-- Auto-sync trigger function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    CASE WHEN user_count = 0 THEN 'admin'::public.user_role ELSE 'farmer'::public.user_role END
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Helper function for admin check
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- RLS Policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- RLS Policies for farms
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all farms" ON farms
  FOR SELECT TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Farmers can view their own farms" ON farms
  FOR SELECT TO authenticated USING (farmer_id = auth.uid());

CREATE POLICY "Farmers can insert their own farms" ON farms
  FOR INSERT TO authenticated WITH CHECK (farmer_id = auth.uid());

CREATE POLICY "Farmers can update their own farms" ON farms
  FOR UPDATE TO authenticated USING (farmer_id = auth.uid());

-- RLS Policies for sensor_readings
ALTER TABLE public.sensor_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Farmers can view their farm sensor readings" ON sensor_readings
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM farms WHERE farms.id = sensor_readings.farm_id AND farms.farmer_id = auth.uid())
  );

-- RLS Policies for alerts
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Farmers can view their farm alerts" ON alerts
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM farms WHERE farms.id = alerts.farm_id AND farms.farmer_id = auth.uid())
  );

CREATE POLICY "Farmers can update their farm alerts" ON alerts
  FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM farms WHERE farms.id = alerts.farm_id AND farms.farmer_id = auth.uid())
  );

-- RLS Policies for sms_logs
ALTER TABLE public.sms_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Farmers can view their own SMS logs" ON sms_logs
  FOR SELECT TO authenticated USING (farmer_id = auth.uid());

-- RLS Policies for market_offers
ALTER TABLE public.market_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Farmers can view offers for their farms" ON market_offers
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM farms WHERE farms.id = market_offers.farm_id AND farms.farmer_id = auth.uid())
  );

-- RLS Policies for yield_data
ALTER TABLE public.yield_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Farmers can view their farm yield data" ON yield_data
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM farms WHERE farms.id = yield_data.farm_id AND farms.farmer_id = auth.uid())
  );

-- Create public view for shareable profile info
CREATE VIEW public_profiles AS
  SELECT id, full_name, country, role FROM profiles;