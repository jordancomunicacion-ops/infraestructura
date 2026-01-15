const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const hash = bcrypt.hashSync('123456', 10);
const uuid = crypto.randomUUID();
// Using firstName instead of name based on schema snippet
const sql = `INSERT INTO "User" (id, email, "passwordHash", role, "firstName") VALUES ('${uuid}', 'gerencia@sotodelprior.com', '${hash}', 'ADMIN', 'Gerencia') ON CONFLICT (email) DO UPDATE SET "passwordHash" = '${hash}', role = 'ADMIN';`;
console.log(sql);
