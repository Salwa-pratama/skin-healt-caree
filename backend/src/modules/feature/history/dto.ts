import { z } from "zod";

export const HistoryResponseSchema = z.object({
  id: z.number(),
  citra: z.string(),
  name: z.string(),
  predictions: z.any(),
  createdAt: z.date(),
  acneProblemSolutions: z.array(z.any()).optional(),
});

export type HistoryResponse = z.infer<typeof HistoryResponseSchema>;
