-- Add name column if it doesn't exist
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "name" TEXT;

-- Try to populate from firstName if it exists (ignoring errors if column missing, actually this might fail if firstName missing. 
-- Safer to just set specific user first).

-- Force update for the admin user to ensure login works immediately
UPDATE "User" SET "name" = 'Gerencia' WHERE email = 'gerencia@sotodelprior.com';

-- Verify 
SELECT email, name FROM "User" WHERE email = 'gerencia@sotodelprior.com';
