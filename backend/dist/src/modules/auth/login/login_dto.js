"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDataSchma = exports.UserResponseSchema = exports.RegisterRequestSchema = exports.LoginRequestSchema = void 0;
const zod_1 = require("zod");
// ===== Request Schemas =====
exports.LoginRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email"),
        password: zod_1.z.string().min(8, "Password min 8 characters"),
    }),
});
exports.RegisterRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email"),
        password: zod_1.z.string().min(8, "Password min 8 characters"),
        name: zod_1.z.string().min(1, "Name required"),
    }),
});
// ===== Response Schemas =====
exports.UserResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    email: zod_1.z.string(),
    name: zod_1.z.string(),
    role: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.LoginDataSchma = zod_1.z.object({
    user: exports.UserResponseSchema,
    accessToken: zod_1.z.string(),
    refreshToken: zod_1.z.string(),
});
