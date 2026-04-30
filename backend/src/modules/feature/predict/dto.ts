import { z } from "zod";

export const PredictResponseSchema = z.object({
  jerawat: z.string(),
  predictions: z.array(z.object({
    label: z.string(),
    confidence: z.number()
  })).optional(),
});

export type PredictResponseSchema = z.infer<typeof PredictResponseSchema>;
