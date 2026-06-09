import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreatePlanSchema = z.object({
  planName: z.string().min(1, "Nama paket diperlukan"),
  maxScansPerMonth: z.number().int(),
  maxTodoCards: z.number().int(),
  maxHistorySaved: z.number().int(),
  price: z.number().int().min(0, "Harga tidak boleh negatif"),
  model: z.string().optional(),
});
export class CreatePlanDto extends createZodDto(CreatePlanSchema) {}

export const UpdatePlanSchema = CreatePlanSchema.partial();
export class UpdatePlanDto extends createZodDto(UpdatePlanSchema) {}

export const SubscribePlanSchema = z.object({
  planId: z.number().optional(),
  plan_id: z.number().optional(),
}).refine(data => data.planId !== undefined || data.plan_id !== undefined, {
  message: "Either planId or plan_id must be provided"
});
export class SubscribePlanDto extends createZodDto(SubscribePlanSchema) {}
