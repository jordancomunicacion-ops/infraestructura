const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Testing DB connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    try {
        await prisma.$connect();
        console.log('Successfully connected to DB!');
        const users = await prisma.user.findMany({ take: 1 });
        console.log('User count query success. Found:', users.length, 'users.');
    } catch (e) {
        console.error('Connection failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
