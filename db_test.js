const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    try {
        const count = await prisma.user.count();
        console.log('DB Connection OK - Users count:', count);
        const users = await prisma.user.findMany({ select: { email: true, role: true } });
        console.log('Users:', JSON.stringify(users, null, 2));
    } catch (e) {
        console.error('DB Error:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

test();
