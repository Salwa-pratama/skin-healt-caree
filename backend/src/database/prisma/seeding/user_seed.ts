import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedSubscriptions } from "./subscription_seed";
import { hashPassword } from "../../../utils/password_util";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // 1. Seed subscriptions first
  await seedSubscriptions(prisma);

  // 2. Find free "pasien" subscription plan
  const freePlan = await prisma.subscription.findUnique({
    where: { planName: "pasien" },
  });

  if (!freePlan) {
    throw new Error("Free plan (pasien) not found after seeding.");
  }

  // 3. Create or find default user
  let user = await prisma.userPublic.findUnique({
    where: { email: "ananda@gmail.com" },
  });

  if (!user) {
    user = await prisma.userPublic.create({
      data: {
        name: "ananda slalwa pratama",
        phone: "08086372441",
        email: "ananda@gmail.com",
        passwordHash: hashPassword("ananda123"),
      },
    });
    console.log("User created:", user);
  } else {
    // Update password hash just to make sure it's valid for testing
    user = await prisma.userPublic.update({
      where: { email: "ananda@gmail.com" },
      data: {
        passwordHash: hashPassword("ananda123"),
      },
    });
    console.log("User password hash updated:", user);
  }

  // 4. Create active user subscription for default user if not exists
  const existingSub = await prisma.userSubscription.findFirst({
    where: {
      userId: user.id,
      status: "active",
    },
  });

  if (!existingSub) {
    const now = new Date();
    const dueDate = new Date();
    dueDate.setMonth(now.getMonth() + 1);

    const sub = await prisma.userSubscription.create({
      data: {
        userId: user.id,
        planId: freePlan.id,
        status: "active",
        startDate: now,
        dueDate: dueDate,
        currentMonthScans: 0,
      },
    });
    console.log("User subscription created:", sub);
  } else {
    console.log("User already has active subscription:", existingSub);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
