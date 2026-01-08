
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('--- VERIFYING PASSWORD ---');
    try {
        const user = await prisma.user.findFirst({ where: { email: 'grenecia@sotodelprior.com' } });
        if (!user) {
            console.log('USER grenecia@sotodelprior.com NOT FOUND!');
            console.log('Listing ALL users:');
            const all = await prisma.user.findMany();
            all.forEach(u => console.log(`- ${u.email}`));
            return;
        }
        console.log(`User: ${user.email}`);
        console.log(`Stored Hash: ${user.password}`);

        const plain = '123456';
        const isMatch = await bcrypt.compare(plain, user.password);
        console.log(`Comparing '${plain}' with stored hash...`);
        console.log(`MATCH RESULT: ${isMatch}`);

        if (!isMatch) {
            console.log('--- GENERATING NEW HASH ---');
            const newHash = await bcrypt.hash(plain, 10);
            console.log(`New Hash: ${newHash}`);

            // Check if verifies immediately
            const check = await bcrypt.compare(plain, newHash);
            console.log(`Immediate Verification: ${check}`);

            if (check) {
                console.log('UPDATING DB WITH NEW HASH...');
                await prisma.user.update({
                    where: { id: user.id },
                    data: { password: newHash }
                });
                console.log('DONE. Try logging in now.');
            }
        }

    } catch (error) {
        console.error('ERROR:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
