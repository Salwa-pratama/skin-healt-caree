import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  skintype: z.enum(["normal", "dry", "oily", "combination", "sensitive"]).optional(),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
