/*
  # Initial Schema Setup for FoodBot

  1. New Tables
    - subscriptions
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - status (text)
      - active_until (timestamptz)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - payments
      - id (uuid, primary key)
      - subscription_id (uuid, references subscriptions)
      - amount (numeric)
      - status (text)
      - payment_id (text)
      - created_at (timestamptz)
    
    - admins
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
*/

-- Create subscriptions table
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  status text NOT NULL DEFAULT 'inactive',
  active_until timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid REFERENCES subscriptions NOT NULL,
  amount numeric NOT NULL,
  status text NOT NULL,
  payment_id text,
  created_at timestamptz DEFAULT now()
);

-- Create admins table
CREATE TABLE admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policies for subscriptions
CREATE POLICY "Users can read own subscription"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all subscriptions"
  ON subscriptions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE user_id = auth.uid()
    )
  );

-- Policies for payments
CREATE POLICY "Users can read own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (
    subscription_id IN (
      SELECT id FROM subscriptions
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all payments"
  ON payments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE user_id = auth.uid()
    )
  );

-- Policies for admins
CREATE POLICY "Admins can read admin list"
  ON admins
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE user_id = auth.uid()
    )
  );