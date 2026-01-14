INSERT INTO "User" (id, email, "passwordHash", role, "firstName", "lastName") 
VALUES (
  'admin-uuid-123', 
  'gerencia@sotodelprior.com', 
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 
  'ADMIN', 
  'Gerencia', 
  'Soto del Prior'
) ON CONFLICT (email) DO UPDATE SET 
  "passwordHash" = EXCLUDED."passwordHash",
  role = 'ADMIN';
