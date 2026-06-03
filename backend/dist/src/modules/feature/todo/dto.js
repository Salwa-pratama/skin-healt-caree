"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHabitSchema = exports.createHabitSchema = exports.updateTreatmentSchema = exports.createTreatmentSchema = void 0;
const zod_1 = require("zod");
exports.createTreatmentSchema = zod_1.z.object({
    hari: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "hari must be a valid date string",
    }),
    tempat: zod_1.z.string().min(1, { message: "tempat is required" }),
    nama: zod_1.z.string().min(1, { message: "nama is required" }),
    pengingat: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "pengingat must be a valid date string",
    }).optional(),
});
exports.updateTreatmentSchema = zod_1.z.object({
    hari: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "hari must be a valid date string",
    }).optional(),
    tempat: zod_1.z.string().optional(),
    nama: zod_1.z.string().optional(),
    pengingat: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "pengingat must be a valid date string",
    }).optional(),
});
exports.createHabitSchema = zod_1.z.object({
    nama: zod_1.z.string().min(1, { message: "nama is required" }),
    hari: zod_1.z.string().min(1, { message: "hari is required" }), // e.g. "senin"
    jam: zod_1.z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "jam must be in HH:MM format" }),
    pengingat: zod_1.z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "pengingat must be in HH:MM format" }).optional(),
});
exports.updateHabitSchema = zod_1.z.object({
    nama: zod_1.z.string().optional(),
    hari: zod_1.z.string().optional(),
    jam: zod_1.z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "jam must be in HH:MM format" }).optional(),
    pengingat: zod_1.z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "pengingat must be in HH:MM format" }).optional(),
});
