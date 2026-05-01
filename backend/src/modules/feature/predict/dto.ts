import { z } from "zod";

export const PredictResponseSchema = z.object({
  jerawat: z.string(),
  predictions: z.array(z.object({
    label: z.string(),
    persentase: z.string()
  })).optional(),
});

export type PredictResponseSchema = z.infer<typeof PredictResponseSchema>;
