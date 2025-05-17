/*
  # Add Links Management Table

  1. New Tables
    - links
      - id (uuid, primary key)
      - name (text) - Button/link name for reference
      - url (text) - The actual URL
      - description (text) - Optional description
      - active (boolean) - Whether the link is active
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS
    - Only admins can manage links
    - All authenticated users can read active links
*/

CREATE TABLE links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  description text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can manage all links"
  ON links
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE user_id = auth.uid()
    )
  );

-- All authenticated users can read active links
CREATE POLICY "Users can read active links"
  ON links
  FOR SELECT
  TO authenticated
  USING (active = true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_links_updated_at
    BEFORE UPDATE ON links
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();