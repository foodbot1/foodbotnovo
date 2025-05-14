/*
  # Add MercadoPago Integration Fields

  1. Changes
    - Add payment_provider field to payments table
    - Add payment_data JSONB field to payments table for storing provider-specific data
    - Add weekly_renewal_date to subscriptions table

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE payments
ADD COLUMN payment_provider text DEFAULT 'mercadopago',
ADD COLUMN payment_data jsonb;

ALTER TABLE subscriptions
ADD COLUMN weekly_renewal_date timestamptz;

-- Update existing RLS policies to include new fields
DROP POLICY IF EXISTS "Users can read own payments" ON payments;
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

DROP POLICY IF EXISTS "Admins can read all payments" ON payments;
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