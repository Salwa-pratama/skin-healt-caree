import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  phone: z.string().max(20).optional(),
  skintype: z.enum(["normal", "dry", "oily", "combination", "sensitive"]).optional(),
  phone: z.string().max(20).optional().nullable(),
  gambar: z.string().optional().nullable(),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
