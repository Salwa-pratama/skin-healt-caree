import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../../../utils/password_util";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
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
      passwordHash: hashPassword("admin123"),
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
