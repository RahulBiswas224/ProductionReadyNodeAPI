// src/config/prisma.js
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

// Create a connection pool using your scalable DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Wrap the pool in Prisma's Postgres Adapter
const adapter = new PrismaPg(pool);

// Initialize the Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

module.exports = prisma;