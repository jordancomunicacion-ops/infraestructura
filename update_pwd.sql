UPDATE "User" SET "passwordHash" = '$2b$10$fOYTw8vD4Q.x6y9XVWevFrEsbeljBLqq' WHERE email = 'gerencia@sotodelprior.com';
SELECT email, "passwordHash" FROM "User";
