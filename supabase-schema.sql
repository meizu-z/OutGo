-- OutGo Database Schema
-- Run this in your Supabase SQL Editor

-- =============================================
-- Table: payment_sources
-- =============================================
CREATE TABLE payment_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  last_four VARCHAR(4),
  type TEXT NOT NULL CHECK (type IN ('Cash', 'Card', 'Wallet')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_payment_sources_user_id ON payment_sources(user_id);

-- =============================================
-- Table: transactions
-- =============================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL,
  payment_source_id UUID REFERENCES payment_sources(id) ON DELETE SET NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  description TEXT,
  has_photo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(date DESC);
CREATE INDEX idx_transactions_category ON transactions(category);

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS on both tables
ALTER TABLE payment_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Payment Sources Policies
-- Users can only view their own payment sources
CREATE POLICY "Users can view own payment sources"
  ON payment_sources
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own payment sources
CREATE POLICY "Users can insert own payment sources"
  ON payment_sources
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own payment sources
CREATE POLICY "Users can update own payment sources"
  ON payment_sources
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own payment sources
CREATE POLICY "Users can delete own payment sources"
  ON payment_sources
  FOR DELETE
  USING (auth.uid() = user_id);

-- Transactions Policies
-- Users can only view their own transactions
CREATE POLICY "Users can view own transactions"
  ON transactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own transactions
CREATE POLICY "Users can insert own transactions"
  ON transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own transactions
CREATE POLICY "Users can update own transactions"
  ON transactions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own transactions
CREATE POLICY "Users can delete own transactions"
  ON transactions
  FOR DELETE
  USING (auth.uid() = user_id);
