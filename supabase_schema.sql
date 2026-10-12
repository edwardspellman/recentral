-- ==============================================================================
-- RECENTRAL - SUPABASE DATABASE SCHEMA
-- Execute this SQL script directly in the Supabase SQL Editor:
-- https://app.supabase.com/project/_/sql
-- ==============================================================================

-- 1. USERS TABLE (With Live Online Presence & Last Seen Tracking)
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
    is_online BOOLEAN DEFAULT false,
    last_seen TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Ensure live presence columns exist if table was already created earlier:
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS last_seen TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

-- 2. SYSTEM SETTINGS TABLE (Global Access & App Settings)
CREATE TABLE IF NOT EXISTS public.system_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. ADMIN CONFIG TABLE (Admin Credentials)
CREATE TABLE IF NOT EXISTS public.admin_config (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    username TEXT NOT NULL DEFAULT 'Spellman',
    password TEXT NOT NULL DEFAULT 'Anonymous099m',
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. USER & ADMIN ACTIVITY AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC POLICIES FOR RECENTRAL CLIENT
-- ==============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Allow read/write policies for public/anon key (can be tightened with auth if needed)
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow public read-write for users" ON public.users;
    CREATE POLICY "Allow public read-write for users" ON public.users FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow public read-write for system_settings" ON public.system_settings;
    CREATE POLICY "Allow public read-write for system_settings" ON public.system_settings FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow public read-write for admin_config" ON public.admin_config;
    CREATE POLICY "Allow public read-write for admin_config" ON public.admin_config FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow public read-write for activity_logs" ON public.activity_logs;
    CREATE POLICY "Allow public read-write for activity_logs" ON public.activity_logs FOR ALL USING (true) WITH CHECK (true);
END $$;

-- Enable Realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.system_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_config;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;

-- ==============================================================================
-- SEED DEFAULT SYSTEM DATA
-- ==============================================================================

-- Seed 10 Default System Users
INSERT INTO public.users (id, username, password, name, status, created_at)
VALUES
    ('usr_1', 'user1', 'User@1234', 'Rahul Sharma', 'active', NOW()),
    ('usr_2', 'user2', 'User@2345', 'Priya Patel', 'active', NOW()),
    ('usr_3', 'user3', 'User@3456', 'Amit Kumar', 'active', NOW()),
    ('usr_4', 'user4', 'User@4567', 'Sneha Roy', 'active', NOW()),
    ('usr_5', 'user5', 'User@5678', 'Vikram Singh', 'active', NOW()),
    ('usr_6', 'user6', 'User@6789', 'Ananya Das', 'active', NOW()),
    ('usr_7', 'user7', 'User@7890', 'Rohan Gupta', 'active', NOW()),
    ('usr_8', 'user8', 'User@8901', 'Pooja Verma', 'active', NOW()),
    ('usr_9', 'user9', 'User@9012', 'Karan Malhotra', 'active', NOW()),
    ('usr_10', 'user10', 'User@0123', 'Neha Sen', 'active', NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed Default Settings
INSERT INTO public.system_settings (key, value, updated_at)
VALUES 
    ('global_user_login', 'true'::jsonb, NOW())
ON CONFLICT (key) DO NOTHING;

-- Seed Default Admin Credentials (Spellman / Anonymous099m)
INSERT INTO public.admin_config (id, username, password, updated_at)
VALUES 
    ('primary', 'Spellman', 'Anonymous099m', NOW())
ON CONFLICT (id) DO NOTHING;

-- Log Initial Setup Event
INSERT INTO public.activity_logs (username, action, details, created_at)
VALUES 
    ('System', 'INITIALIZE_DATABASE', 'REcentral Supabase Database Initialized Successfully', NOW());
