import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  skintype: z.string().optional(),
});

export class UpdateProfileDto extends createZodDto(UpdateProfileSchema) {}
