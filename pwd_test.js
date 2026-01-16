const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testPassword() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: 'gerencia@sotodelprior.com' }
        });

        if (!user) {
            console.log('User not found');
            return;
        }

        console.log('User found:', user.email);
        console.log('Password hash:', user.passwordHash);
        console.log('Hash length:', user.passwordHash.length);

        // Test with the password "123456"
        const testPassword = '123456';
        const match = await bcrypt.compare(testPassword, user.passwordHash);
        console.log('Password "123456" matches:', match);

    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

testPassword();
