-- AI Conversations table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Diagnoses table
CREATE TABLE IF NOT EXISTS ai_diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  issue TEXT NOT NULL,
  confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
  status TEXT NOT NULL CHECK (status IN ('monitoring', 'escalated', 'resolved')),
  diagnosis_date DATE DEFAULT CURRENT_DATE,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_diagnoses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_conversations
CREATE POLICY "Users can view own conversations"
  ON ai_conversations FOR SELECT
  USING (auth.uid() = farmer_id);

CREATE POLICY "Users can insert own conversations"
  ON ai_conversations FOR INSERT
  WITH CHECK (auth.uid() = farmer_id);

-- RLS Policies for ai_diagnoses
CREATE POLICY "Users can view own diagnoses"
  ON ai_diagnoses FOR SELECT
  USING (auth.uid() = farmer_id);

CREATE POLICY "Users can insert own diagnoses"
  ON ai_diagnoses FOR INSERT
  WITH CHECK (auth.uid() = farmer_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_conversations_farmer_id ON ai_conversations(farmer_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_created_at ON ai_conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_diagnoses_farmer_id ON ai_diagnoses(farmer_id);
CREATE INDEX IF NOT EXISTS idx_ai_diagnoses_date ON ai_diagnoses(diagnosis_date DESC);