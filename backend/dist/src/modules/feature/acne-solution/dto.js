"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcneSolutionSchema = exports.createAcneSolutionSchema = void 0;
const zod_1 = require("zod");
exports.createAcneSolutionSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: "type is required" }),
    description: zod_1.z.string().min(1, { message: "description is required" }),
    goodIngredients: zod_1.z.array(zod_1.z.string()),
    badIngredients: zod_1.z.array(zod_1.z.string()),
    habits: zod_1.z.array(zod_1.z.string()),
    treatments: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        time: zod_1.z.string()
    }))
});
exports.updateAcneSolutionSchema = exports.createAcneSolutionSchema.partial();
