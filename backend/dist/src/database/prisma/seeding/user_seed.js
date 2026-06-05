"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({
    adapter,
});
async function main() {
    const user = await prisma.userPublic.create({
        data: {
            name: "ananda slalwa pratama",
            phone: "08086372441",
            email: "ananda@gmail.com",
            passwordHash: "ananda123 ",
        },
    });
    console.log("User created:", user);
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
