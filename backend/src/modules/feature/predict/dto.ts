import { z } from "zod";

export const PredictResponseSchema = z.object({
  jerawat: z.string(),
  predictions: z.array(z.object({
    label: z.string(),
    persentase: z.string()
  })).optional(),
  rekomendasi: z.object({
    type: z.string(),
    description: z.string(),
    goodIngredients: z.array(z.string()),
    badIngredients: z.array(z.string()),
    habits: z.array(z.string()),
    catatan_tambahan: z.string().optional()
  }).optional()
});

export type PredictResponseSchema = z.infer<typeof PredictResponseSchema>;
