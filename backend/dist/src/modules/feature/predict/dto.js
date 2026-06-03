"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictResponseSchema = void 0;
const zod_1 = require("zod");
exports.PredictResponseSchema = zod_1.z.object({
    jerawat: zod_1.z.string(),
    predictions: zod_1.z.array(zod_1.z.object({
        label: zod_1.z.string(),
        persentase: zod_1.z.string()
    })).optional(),
    rekomendasi: zod_1.z.object({
        type: zod_1.z.string(),
        description: zod_1.z.string(),
        goodIngredients: zod_1.z.array(zod_1.z.string()),
        badIngredients: zod_1.z.array(zod_1.z.string()),
        habits: zod_1.z.array(zod_1.z.string()),
        treatments: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            time: zod_1.z.string()
        })).optional(),
        catatan_tambahan: zod_1.z.string().optional()
    }).optional()
});
