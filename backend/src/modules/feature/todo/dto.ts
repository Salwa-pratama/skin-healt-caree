import { z } from "zod";

export const createTreatmentSchema = z.object({
  hari: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "hari must be a valid date string",
  }),
  tempat: z.string().min(1, { message: "tempat is required" }),
  nama: z.string().min(1, { message: "nama is required" }),
  pengingat: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "pengingat must be a valid date string",
  }).optional(),
});

export const updateTreatmentSchema = z.object({
  hari: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "hari must be a valid date string",
  }).optional(),
  tempat: z.string().optional(),
  nama: z.string().optional(),
  pengingat: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "pengingat must be a valid date string",
  }).optional(),
});

export const createHabitSchema = z.object({
  nama: z.string().min(1, { message: "nama is required" }),
  hari: z.string().min(1, { message: "hari is required" }), // e.g. "senin"
  jam: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "jam must be in HH:MM format" }),
  pengingat: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "pengingat must be in HH:MM format" }).optional(),
});

export const updateHabitSchema = z.object({
  nama: z.string().optional(),
  hari: z.string().optional(),
  jam: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "jam must be in HH:MM format" }).optional(),
  pengingat: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "pengingat must be in HH:MM format" }).optional(),
});

export type CreateTreatmentDTO = z.infer<typeof createTreatmentSchema>;
export type UpdateTreatmentDTO = z.infer<typeof updateTreatmentSchema>;
export type CreateHabitDTO = z.infer<typeof createHabitSchema>;
export type UpdateHabitDTO = z.infer<typeof updateHabitSchema>;
