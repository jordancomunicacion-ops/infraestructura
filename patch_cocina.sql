ALTER TABLE "User" ADD COLUMN IF NOT EXISTS name text;
UPDATE "User" SET name = 'Gerencia' WHERE email = 'gerencia@sotodelprior.com';
