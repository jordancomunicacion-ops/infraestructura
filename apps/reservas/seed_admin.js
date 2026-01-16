const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando seed...');
    try {
        const email = 'gerencia@sotodelprior.com';
        const password = '123456';
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Intentando crear usuario...');
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                passwordHash: hashedPassword,
                name: 'Gerencia',
                role: 'ADMIN'
            },
            create: {
                email,
                passwordHash: hashedPassword,
                name: 'Gerencia',
                role: 'ADMIN',
            },
        });
        console.log('Usuario creado:', user);
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
