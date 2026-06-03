"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryResponseSchema = void 0;
const zod_1 = require("zod");
exports.HistoryResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    citra: zod_1.z.string(),
    name: zod_1.z.string(),
    predictions: zod_1.z.any(),
    createdAt: zod_1.z.date(),
    acneProblemSolutions: zod_1.z.array(zod_1.z.any()).optional(),
});
