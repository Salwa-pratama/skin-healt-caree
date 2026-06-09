import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const TreatmentSchema = z.object({
  name: z.string(),
  time: z.string(),
});

export const CreateAcneSolutionSchema = z.object({
  type: z.string().min(1, "Type is required"),
  description: z.string().min(1, "Description is required"),
  goodIngredients: z.array(z.string()),
  badIngredients: z.array(z.string()),
  habits: z.array(z.string()),
  treatments: z.array(TreatmentSchema),
});

export class CreateAcneSolutionDto extends createZodDto(CreateAcneSolutionSchema) {}

export const UpdateAcneSolutionSchema = CreateAcneSolutionSchema.partial();
export class UpdateAcneSolutionDto extends createZodDto(UpdateAcneSolutionSchema) {}
