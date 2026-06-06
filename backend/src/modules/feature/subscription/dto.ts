import { z } from "zod";

export const subscribePlanSchema = z.object({
  planId: z.union([z.number(), z.string().transform((val) => parseInt(val, 10))]).optional(),
  plan_id: z.union([z.number(), z.string().transform((val) => parseInt(val, 10))]).optional(),
}).refine((data) => data.planId !== undefined || data.plan_id !== undefined, {
  message: "Either planId or plan_id must be provided",
  path: ["planId"],
});

export const createSubscriptionSchema = z.object({
  planName: z.string().min(1, { message: "planName is required" }),
  model: z.string().optional(),
  maxScansPerMonth: z.number({ message: "maxScansPerMonth must be a number" }),
  maxTodoCards: z.number({ message: "maxTodoCards must be a number" }),
  maxHistorySaved: z.number({ message: "maxHistorySaved must be a number" }),
  price: z.number({ message: "price must be a number" }),
});

export const updateSubscriptionSchema = z.object({
  planName: z.string().optional(),
  model: z.string().optional(),
  maxScansPerMonth: z.number().optional(),
  maxTodoCards: z.number().optional(),
  maxHistorySaved: z.number().optional(),
  price: z.number().optional(),
});

export type SubscribePlanInput = z.infer<typeof subscribePlanSchema>;
export type CreatePlanDTO = z.infer<typeof createSubscriptionSchema>;
export type UpdatePlanDTO = z.infer<typeof updateSubscriptionSchema>;
