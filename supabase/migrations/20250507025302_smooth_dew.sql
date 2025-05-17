/*
  # Add policies and triggers for payment links table

  1. Changes
    - Add RLS policies for payment links table
    - Add updated_at trigger
    - Insert initial payment link

  2. Security
    - Enable RLS
    - Add admin management policy
    - Add user view policy for active links
*/

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'payment_links' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE payment_links ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can manage all payment links" ON payment_links;
DROP POLICY IF EXISTS "Users can view active payment links" ON payment_links;

-- Create admin policy
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

-- Create user policy
CREATE POLICY "Users can view active payment links"
  ON payment_links
  FOR SELECT
  TO authenticated
  USING (active = true AND (expires_at IS NULL OR expires_at > now()));

-- Create trigger for updated_at if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_payment_links_updated_at'
  ) THEN
    CREATE TRIGGER update_payment_links_updated_at
      BEFORE UPDATE ON payment_links
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Insert initial payment link if it doesn't exist
INSERT INTO payment_links (name, amount, currency, active)
SELECT 'Assinatura Mensal', 49.90, 'BRL', true
WHERE NOT EXISTS (
  SELECT 1 FROM payment_links 
  WHERE name = 'Assinatura Mensal'
);