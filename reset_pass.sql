INSERT INTO "User" (id, email, "passwordHash", name) 
VALUES ('admin-id-123', 'gerencia@sotodelprior.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Gerencia')
ON CONFLICT (email) 
DO UPDATE SET "passwordHash" = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', name = 'Gerencia';
