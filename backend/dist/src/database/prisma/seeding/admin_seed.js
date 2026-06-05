"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const password_util_1 = require("../../../utils/password_util");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({
    adapter,
});
async function main() {
    const adminEmail = "admin@gmail.com";
    const existing = await prisma.userPublic.findUnique({
        where: { email: adminEmail }
    });
    if (existing) {
        console.log("Admin account already exists:", existing);
        return;
    }
    const user = await prisma.userPublic.create({
        data: {
            name: "Administrator",
            phone: "08000000000",
            email: adminEmail,
            passwordHash: (0, password_util_1.hashPassword)("admin123"),
            role: "admin"
        },
    });
    console.log("✅ Admin account created successfully:", user);
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
