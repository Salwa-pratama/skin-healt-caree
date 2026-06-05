"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(100).optional(),
    phone: zod_1.z.string().max(20).optional(),
    skintype: zod_1.z.enum(["normal", "dry", "oily", "combination", "sensitive"]).optional(),
    avatar: zod_1.z.string().optional().nullable(),
});
