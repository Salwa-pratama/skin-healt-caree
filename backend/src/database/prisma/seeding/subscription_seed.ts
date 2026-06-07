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

export const plans = [
  {
    planName: "pasien",
    model: "/api/predict/pasien",
    maxScansPerMonth: 10,
    maxTodoCards: 10,
    maxHistorySaved: 10,
    price: 0,
  },
  {
    planName: "dokter",
    model: "/api/predict/dokter",
    maxScansPerMonth: 50,
    maxTodoCards: 50,
    maxHistorySaved: 50,
    price: 60000,
  },
  {
    planName: "peneliti",
    model: "/api/predict/peneliti",
    maxScansPerMonth: -1,
    maxTodoCards: -1,
    maxHistorySaved: -1,
    price: 120000,
  },
];

export async function seedSubscriptions(client: PrismaClient = prisma) {
  console.log("Seeding subscription plans...");
  
  for (const plan of plans) {
    await client.subscription.upsert({
      where: { planName: plan.planName },
      update: {
        model: plan.model,
        maxScansPerMonth: plan.maxScansPerMonth,
        maxTodoCards: plan.maxTodoCards,
        maxHistorySaved: plan.maxHistorySaved,
        price: plan.price,
      },
      create: {
        planName: plan.planName,
        model: plan.model,
        maxScansPerMonth: plan.maxScansPerMonth,
        maxTodoCards: plan.maxTodoCards,
        maxHistorySaved: plan.maxHistorySaved,
        price: plan.price,
      },
    });
  }
  
  console.log("✅ Subscription plans seeded successfully!");
}

if (require.main === module) {
  seedSubscriptions()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
