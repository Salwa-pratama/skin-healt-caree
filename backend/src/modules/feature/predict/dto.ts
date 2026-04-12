import { z } from "zod";

export const PredictResponseSchema = z.object({
  jerawat: z.string(),
});

export type PredictResponseSchema = z.infer<typeof PredictResponseSchema>;
