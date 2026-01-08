
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'usuario@sotodelprior.com';
    const plainPassword = 'sotodelprior'; // Default password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: 'ADMIN' // Ensure role is updated if exists
        },
        create: {
            email,
            password: hashedPassword,
            role: 'ADMIN',
            hotelId: undefined // Explicitly undefined if optional
        },
    });

    console.log(`✅ Admin user created/updated: ${user.email}`);
    console.log(`🔑 Password: ${plainPassword}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
