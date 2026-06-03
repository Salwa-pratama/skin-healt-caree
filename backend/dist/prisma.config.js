"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("@prisma/config");
exports.default = (0, config_1.defineConfig)({
    schema: "src/database/prisma/schema.prisma",
    migrations: {
        path: "src/database/prisma/migrations",
        seed: "ts-node src/database/prisma/seeding/user_seed.ts",
    },
    datasource: {
        url: process.env.DATABASE_URL ||
            "postgresql://postgres.mfgrnyowrozbfgnhxpkg:supabase191@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres",
    },
});
