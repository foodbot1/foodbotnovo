/*
  # Add payment links table

  1. New Tables
    - payment_links
      - id (uuid, primary key)
      - name (text)
      - amount (numeric)
      - currency (text)
      - active (boolean)
      - expires_at (timestamptz)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for admins and users
*/

CREATE TABLE payment_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'BRL',
  active boolean DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE payment_links ENABLE ROW LEVEL SECURITY;

-- Admins can manage all payment links
CREATE POLICY "Admins can manage all payment links"
  ON payment_links
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE user_id = auth.uid()
    )
  );

-- Users can only view active payment links
CREATE POLICY "Users can view active payment links"
  ON payment_links
  FOR SELECT
  TO authenticated
  USING (active = true AND (expires_at IS NULL OR expires_at > now()));

-- Create trigger for updated_at
CREATE TRIGGER update_payment_links_updated_at
    BEFORE UPDATE ON payment_links
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert initial payment link
INSERT INTO payment_links (name, amount, currency, active)
VALUES ('Assinatura Mensal', 49.90, 'BRL', true);