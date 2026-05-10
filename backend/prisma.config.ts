import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "src/database/prisma/schema.prisma",

  migrations: {
    path: "src/database/prisma/migrations",
    seed: "ts-node src/database/prisma/seeding/user_seed.ts",
  },
  datasource: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://postgres.mfgrnyowrozbfgnhxpkg:supabase191@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres",
  },
});
