import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
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
