import { z } from "zod";

export const createAcneSolutionSchema = z.object({
  type: z.string().min(1, { message: "type is required" }),
  description: z.string().min(1, { message: "description is required" }),
  goodIngredients: z.array(z.string()),
  badIngredients: z.array(z.string()),
  habits: z.array(z.string()),
  treatments: z.array(z.object({
    name: z.string(),
    time: z.string()
  }))
});

export const updateAcneSolutionSchema = createAcneSolutionSchema.partial();

export type CreateAcneSolutionDTO = z.infer<typeof createAcneSolutionSchema>;
export type UpdateAcneSolutionDTO = z.infer<typeof updateAcneSolutionSchema>;
