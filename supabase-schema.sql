-- OutGo Database Schema (Complete)
-- Run this in your Supabase SQL Editor
-- Last updated: December 2025

-- =============================================
-- CLEANUP (Only if you need to reset)
-- =============================================
-- Uncomment these lines to drop existing tables
-- DROP TABLE IF EXISTS user_achievements CASCADE;
-- DROP TABLE IF EXISTS spending_limits CASCADE;
-- DROP TABLE IF EXISTS user_settings CASCADE;
-- DROP TABLE IF EXISTS categories CASCADE;
-- DROP TABLE IF EXISTS transactions CASCADE;
-- DROP TABLE IF EXISTS payment_sources CASCADE;

-- =============================================
-- Table: payment_sources
-- Stores user's payment methods (cards, wallets, cash)
-- =============================================
CREATE TABLE IF NOT EXISTS payment_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  last_four VARCHAR(4),
  type TEXT NOT NULL CHECK (type IN ('Cash', 'Card', 'Wallet', 'Bank', 'Other')),
  color TEXT DEFAULT '#4D4D4D', -- For UI customization
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_payment_sources_user_id ON payment_sources(user_id);

-- =============================================
-- Table: categories
-- Default and custom expense categories
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- NULL for default categories
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Tag', -- Phosphor icon name
  color TEXT DEFAULT '#EBCDAA',
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name) -- Each user can have unique category names
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_is_default ON categories(is_default);

-- =============================================
-- Table: transactions
-- Main expense tracking table
-- =============================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  category TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  payment_source_id UUID REFERENCES payment_sources(id) ON DELETE SET NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  description TEXT,
  notes TEXT, -- Additional notes
  location TEXT, -- Optional location data
  has_photo BOOLEAN DEFAULT FALSE,
  photo_url TEXT, -- Supabase Storage URL
  tags TEXT[], -- Array of tags for filtering
  is_recurring BOOLEAN DEFAULT FALSE,
  recurring_frequency TEXT CHECK (recurring_frequency IN ('daily', 'weekly', 'monthly', 'yearly')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category);
CREATE INDEX IF NOT EXISTS idx_transactions_category_id ON transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_transactions_payment_source ON transactions(payment_source_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON transactions(user_id, date DESC);

-- =============================================
-- Table: user_settings
-- User preferences and app settings
-- =============================================
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Display preferences
  currency TEXT DEFAULT 'USD',
  currency_symbol TEXT DEFAULT '$',
  date_format TEXT DEFAULT 'MM/DD/YYYY',
  time_format TEXT DEFAULT '12h' CHECK (time_format IN ('12h', '24h')),
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
  
  -- Notification settings
  notifications_enabled BOOLEAN DEFAULT TRUE,
  budget_alert_threshold NUMERIC(3, 2) DEFAULT 0.80, -- Alert at 80% of budget
  weekly_summary_enabled BOOLEAN DEFAULT TRUE,
  
  -- Default values
  default_payment_source_id UUID REFERENCES payment_sources(id) ON DELETE SET NULL,
  default_category TEXT DEFAULT 'Coffee',
  
  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_step INTEGER DEFAULT 0,
  
  -- Stats
  first_transaction_date TIMESTAMPTZ,
  total_transactions_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Table: spending_limits
-- Budget limits per category or overall
-- =============================================
CREATE TABLE IF NOT EXISTS spending_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT, -- NULL means overall budget
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  period TEXT NOT NULL DEFAULT 'monthly' CHECK (period IN ('daily', 'weekly', 'monthly', 'yearly')),
  is_active BOOLEAN DEFAULT TRUE,
  notify_at_percent NUMERIC(3, 2) DEFAULT 0.80, -- Notify at 80%
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, category, period) -- One limit per category per period
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_spending_limits_user_id ON spending_limits(user_id);
CREATE INDEX IF NOT EXISTS idx_spending_limits_category ON spending_limits(category);

-- =============================================
-- Table: user_achievements
-- Tracks unlocked achievements/badges
-- =============================================
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL, -- Maps to frontend achievement definitions
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  progress_data JSONB DEFAULT '{}', -- Store progress info if needed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id) -- Each user can unlock each achievement once
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);

-- =============================================
-- Table: daily_streaks
-- Tracks consecutive day logging streaks
-- =============================================
CREATE TABLE IF NOT EXISTS daily_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_log_date DATE,
  streak_start_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS on all tables
ALTER TABLE payment_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE spending_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_streaks ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Payment Sources Policies
-- =============================================
DROP POLICY IF EXISTS "Users can view own payment sources" ON payment_sources;
CREATE POLICY "Users can view own payment sources"
  ON payment_sources FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own payment sources" ON payment_sources;
CREATE POLICY "Users can insert own payment sources"
  ON payment_sources FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own payment sources" ON payment_sources;
CREATE POLICY "Users can update own payment sources"
  ON payment_sources FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own payment sources" ON payment_sources;
CREATE POLICY "Users can delete own payment sources"
  ON payment_sources FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- Categories Policies
-- =============================================
DROP POLICY IF EXISTS "Users can view default and own categories" ON categories;
CREATE POLICY "Users can view default and own categories"
  ON categories FOR SELECT
  USING (is_default = TRUE OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own categories" ON categories;
CREATE POLICY "Users can insert own categories"
  ON categories FOR INSERT
  WITH CHECK (auth.uid() = user_id AND is_default = FALSE);

DROP POLICY IF EXISTS "Users can update own categories" ON categories;
CREATE POLICY "Users can update own categories"
  ON categories FOR UPDATE
  USING (auth.uid() = user_id AND is_default = FALSE);

DROP POLICY IF EXISTS "Users can delete own categories" ON categories;
CREATE POLICY "Users can delete own categories"
  ON categories FOR DELETE
  USING (auth.uid() = user_id AND is_default = FALSE);

-- =============================================
-- Transactions Policies
-- =============================================
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;
CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own transactions" ON transactions;
CREATE POLICY "Users can update own transactions"
  ON transactions FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own transactions" ON transactions;
CREATE POLICY "Users can delete own transactions"
  ON transactions FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- User Settings Policies
-- =============================================
DROP POLICY IF EXISTS "Users can view own settings" ON user_settings;
CREATE POLICY "Users can view own settings"
  ON user_settings FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own settings" ON user_settings;
CREATE POLICY "Users can insert own settings"
  ON user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;
CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- Spending Limits Policies
-- =============================================
DROP POLICY IF EXISTS "Users can view own spending limits" ON spending_limits;
CREATE POLICY "Users can view own spending limits"
  ON spending_limits FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own spending limits" ON spending_limits;
CREATE POLICY "Users can insert own spending limits"
  ON spending_limits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own spending limits" ON spending_limits;
CREATE POLICY "Users can update own spending limits"
  ON spending_limits FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own spending limits" ON spending_limits;
CREATE POLICY "Users can delete own spending limits"
  ON spending_limits FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- User Achievements Policies
-- =============================================
DROP POLICY IF EXISTS "Users can view own achievements" ON user_achievements;
CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own achievements" ON user_achievements;
CREATE POLICY "Users can insert own achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =============================================
-- Daily Streaks Policies
-- =============================================
DROP POLICY IF EXISTS "Users can view own streaks" ON daily_streaks;
CREATE POLICY "Users can view own streaks"
  ON daily_streaks FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own streaks" ON daily_streaks;
CREATE POLICY "Users can insert own streaks"
  ON daily_streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own streaks" ON daily_streaks;
CREATE POLICY "Users can update own streaks"
  ON daily_streaks FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- Insert Default Categories
-- =============================================
INSERT INTO categories (name, icon, is_default, is_active) VALUES
  ('Coffee', 'Coffee', TRUE, TRUE),
  ('Transport', 'Train', TRUE, TRUE),
  ('Utilities', 'Lightning', TRUE, TRUE),
  ('Shopping', 'ShoppingCart', TRUE, TRUE),
  ('Health', 'FirstAid', TRUE, TRUE),
  ('Entertainment', 'Confetti', TRUE, TRUE),
  ('Food', 'Hamburger', TRUE, TRUE),
  ('Travel', 'AirplaneTilt', TRUE, TRUE),
  ('Education', 'Book', TRUE, TRUE),
  ('Gaming', 'GameController', TRUE, TRUE),
  ('Fitness', 'Barbell', TRUE, TRUE),
  ('Pets', 'Dog', TRUE, TRUE),
  ('Gifts', 'Gift', TRUE, TRUE),
  ('Work', 'Briefcase', TRUE, TRUE),
  ('Home', 'House', TRUE, TRUE),
  ('Car', 'Car', TRUE, TRUE)
ON CONFLICT DO NOTHING;

-- =============================================
-- Triggers for updated_at timestamps
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
DROP TRIGGER IF EXISTS update_payment_sources_updated_at ON payment_sources;
CREATE TRIGGER update_payment_sources_updated_at
  BEFORE UPDATE ON payment_sources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_transactions_updated_at ON transactions;
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_spending_limits_updated_at ON spending_limits;
CREATE TRIGGER update_spending_limits_updated_at
  BEFORE UPDATE ON spending_limits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_daily_streaks_updated_at ON daily_streaks;
CREATE TRIGGER update_daily_streaks_updated_at
  BEFORE UPDATE ON daily_streaks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Helper Functions
-- =============================================

-- Function to get spending total for a category in a period
CREATE OR REPLACE FUNCTION get_category_spending(
  p_user_id UUID,
  p_category TEXT,
  p_period TEXT DEFAULT 'monthly'
)
RETURNS NUMERIC AS $$
DECLARE
  start_date TIMESTAMPTZ;
  total NUMERIC;
BEGIN
  CASE p_period
    WHEN 'daily' THEN start_date := DATE_TRUNC('day', NOW());
    WHEN 'weekly' THEN start_date := DATE_TRUNC('week', NOW());
    WHEN 'monthly' THEN start_date := DATE_TRUNC('month', NOW());
    WHEN 'yearly' THEN start_date := DATE_TRUNC('year', NOW());
    ELSE start_date := DATE_TRUNC('month', NOW());
  END CASE;

  SELECT COALESCE(SUM(amount), 0) INTO total
  FROM transactions
  WHERE user_id = p_user_id
    AND category = p_category
    AND date >= start_date;

  RETURN total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update streak on transaction insert
CREATE OR REPLACE FUNCTION update_streak_on_transaction()
RETURNS TRIGGER AS $$
DECLARE
  last_date DATE;
  current_date_val DATE := CURRENT_DATE;
BEGIN
  -- Get user's last log date
  SELECT last_log_date INTO last_date
  FROM daily_streaks
  WHERE user_id = NEW.user_id;

  IF last_date IS NULL THEN
    -- First transaction ever, create streak record
    INSERT INTO daily_streaks (user_id, current_streak, longest_streak, last_log_date, streak_start_date)
    VALUES (NEW.user_id, 1, 1, current_date_val, current_date_val);
  ELSIF last_date = current_date_val THEN
    -- Already logged today, no update needed
    NULL;
  ELSIF last_date = current_date_val - INTERVAL '1 day' THEN
    -- Consecutive day, increment streak
    UPDATE daily_streaks
    SET current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1),
        last_log_date = current_date_val
    WHERE user_id = NEW.user_id;
  ELSE
    -- Streak broken, reset
    UPDATE daily_streaks
    SET current_streak = 1,
        last_log_date = current_date_val,
        streak_start_date = current_date_val
    WHERE user_id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update streak on new transaction
DROP TRIGGER IF EXISTS update_streak_trigger ON transactions;
CREATE TRIGGER update_streak_trigger
  AFTER INSERT ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_streak_on_transaction();
