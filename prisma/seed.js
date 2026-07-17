// prisma/seed.js

// 1. Load your .env file so the DATABASE_URL exists!
require('dotenv').config();

// 2. Import the prisma client
const prisma = require('../src/config/prisma'); 

async function main() {
    console.log('Seeding database with 100 users...');
    
    // Fix the 'consl' typo to 'const'
    const users = Array.from({ length: 100 }, (_, i) => ({
        name: `User ${i + 1}`
    }));

    // Use Prisma's createMany for efficient batch insertion
    await prisma.user.createMany({
        data: users
    });

    console.log('✅ Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });