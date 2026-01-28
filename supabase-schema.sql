-- Expense Tracker Database Schema
-- Run this SQL in your Supabase project's SQL Editor

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category_id);
CREATE INDEX IF NOT EXISTS idx_expenses_amount ON expenses(amount);

-- Insert default categories for a software company
INSERT INTO categories (name) VALUES
  ('Salaries'),
  ('Cloud Services'),
  ('Software Licenses'),
  ('Marketing'),
  ('Office Supplies'),
  ('Travel'),
  ('Utilities'),
  ('Contractors'),
  ('Hardware'),
  ('Training'),
  ('Other')
ON CONFLICT (name) DO NOTHING;

-- Optional: Enable Row Level Security for production
-- Uncomment these lines if you want to add authentication later

-- ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create policies (example for authenticated users)
-- CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (true);
-- CREATE POLICY "Enable insert for authenticated users" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- CREATE POLICY "Enable read access for all users" ON expenses FOR SELECT USING (true);
-- CREATE POLICY "Enable all access for authenticated users" ON expenses FOR ALL USING (auth.role() = 'authenticated');
